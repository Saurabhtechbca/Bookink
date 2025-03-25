import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import { User } from "../models/userModels.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import {sendVerificationCode} from "../utils/sendVerification.js";
import{sendToken} from "../utils/sendToken.js";

export const register = catchAsyncErrors(async(req, res, next) => {;
try {
    const { name, email, password } =req.body;
    if(!name || !email || !password){
        return next(new ErrorHandler("Please enter all fields", 400));
    }
    const isRegistered= await User.findOne({email, accountVerified: true });
    if(isRegistered){
        return next(new ErrorHandler("User already exists", 400));
        }
        const registrationAttemptsByUser = await User.find({
            email,
            accountVerified: false,
        });
        if(registrationAttemptsByUser.length >= 5) {
            return next(
                new ErrorHandler(
                    "You have exceeded the number of registration attempts.Please contact support.",
                400     
                )
             );
            }
            if(password.length < 8 || password.length > 16) {
                return next (new ErrorHandler ("Password must be between 8 and 16 characters.", 400));
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                name,
                email,password: hashedPassword,
            })
            const verificationCode = await user.generateVerificationCode();
            await user.save();
            sendVerificationCode(verificationCode, email, res);
} catch (error) {
    next(error);
}
});


export const verifyOTP = catchAsyncErrors(async (req, res, next) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
        return next(new ErrorHandler("Email or otp is missing.", 400));
    }
    try {
        const userAllEntries = await User.find({
            email,
            accountVerified: false,

        }).sort({ createdAt: -1 });

       if( !userAllEntries) {
        return next (new ErrorHandler("USer not found.", 400));
       } 

       let user;

       if(userAllEntries.length > 1){
        user = userAllEntries[0];
        await User.deleteMany({
          _id: { $ne: user._id },
          email,
          accountVerified: false,
        });
       }else {
        user = userAllEntries[0];
       }

       if(user.verificationCode !== Number(otp)){
        return next (new ErrorHandler("Invalid OTP", 400));
       }
       const currentTime = Date.now();

       const verificationCodeExpire = new Date(
        user.verificationCodeExpire
       ).getTime();

       if(currentTime > verificationCodeExpire){
        return next (new ErrorHandler("OTP has expired.", 400));
       }
      user.accountVerified = true;
      user.verificationCode = null;
      user.verificationCodeExpire = null;
      await user.save({ validateModifiedOnly: true });  

      sendToken(user, 200, "Account Verified.", res);
    }catch (error) {
        return next (new ErrorHandler("Internal server error", 5000));    }

});