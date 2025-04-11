export const sendToken = (user, statusCode, message, res) => {
  const token = user.generateToken();

  const cookieExpireDays = Number(process.env.COOKIE_EXPIRE) || 7; // fallback to 7 days

  res
    .status(statusCode)
    .cookie("token", token, {
      expires: new Date(Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    })
    .json({
      success: true,
      user,
      message,
      token,
    });
};



