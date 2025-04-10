export function generateVerficationOtpEmailTemplate(otpCode) {
    return `
        <p>Your OTP code is: <strong>${otpCode}</strong></p>
        <p>This OTP is valid for 10 minutes. Please do not share it with anyone.</p>
        <p>- Bookink Team</p>
    `;
}
