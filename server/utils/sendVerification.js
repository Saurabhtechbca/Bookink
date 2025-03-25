import { generateVerficationOtpEmailTemplate } from "./emailTemplate.js";
import { sendEmail } from "./sendEmail.js";

export async function sendVerificationCode(VerificationCode, email, res){
    try {
        const message = generateVerficationOtpEmailTemplate(VerificationCode);
        sendEmail({
            email,
            subject: "Verification Code (Bookink Library Management System)",
            message,
        });
        res.status(200).json({
            success: true,
            message: "Verification code sent successfully.",
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Verification code failed to send.",
            error: error.message,
         });
    }
}