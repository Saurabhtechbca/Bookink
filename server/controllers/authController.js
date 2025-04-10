// controllers/authController.js

import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import catchAsyncErrors from '../middleware/catchAsyncErrors.js';
import errorHandler from '../utils/errorHandler.js';
import { sendVerificationCode } from '../utils/sendVerificationCode.js';
import { sendToken } from '../utils/sendToken.js';

// ✅ Register Controller
export const register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }

  // 🧹 Clean up old unverified entries older than 10 minutes
  await User.deleteMany({
    email,
    accountVerified: false,
    createdAt: { $lt: new Date(Date.now() - 10 * 60 * 1000) },
  });

  const isRegistered = await User.findOne({ email, accountVerified: true });
  if (isRegistered) {
    return next(new ErrorHandler("User already exists", 400));
  }

  const registrationAttempts = await User.find({
    email,
    accountVerified: false,
  });

  if (registrationAttempts.length >= 5) {
    return next(
      new ErrorHandler(
        "You have exceeded the number of registration attempts. Please contact support.",
        400
      )
    );
  }

  if (password.length < 8 || password.length > 16) {
    return next(
      new ErrorHandler("Password must be between 8 and 16 characters.", 400)
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const verificationCode = await user.generateVerificationCode();
  await user.save();

  await sendVerificationCode(verificationCode, email, res); // Note the await
});

// ✅ Verify OTP Controller
export const verifyOTP = catchAsyncErrors(async (req, res, next) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return next(new ErrorHandler("Please provide email and OTP", 400));
  }

  const user = await User.findOne({ email, accountVerified: false });

  if (!user) {
    return next(new ErrorHandler("User not found or already verified", 404));
  }

  const now = Date.now();
  const isValid =
    user.verificationCode === Number(otp) &&
    now <= new Date(user.verificationCodeExpire).getTime();

  if (!isValid) {
    return next(new ErrorHandler("Invalid or expired OTP", 400));
  }

  user.accountVerified = true;
  user.verificationCode = undefined;
  user.verificationCodeExpire = undefined;

  await user.save();

  sendToken(user, 200, "Account verified successfully", res);
});
