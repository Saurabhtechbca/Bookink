export function generateVerficationOtpEmailTemplate(otpCode) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OTP Verification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                text-align: center;
                padding: 20px;
            }
            .container {
                max-width: 400px;
                background: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                margin: auto;
            }
            .otp {
                font-size: 24px;
                font-weight: bold;
                color: #333;
                background: #f0f0f0;
                padding: 10px;
                border-radius: 5px;
                display: inline-block;
                margin-top: 10px;
                letter-spacing: 2px;
            }
            .footer {
                margin-top: 20px;
                font-size: 12px;
                color: #777;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>OTP Verification</h2>
            <p>Your One-Time Password (OTP) for verification is:</p>
            <div class="otp">${otpCode}</div>
            <p>Thank you, <br> Bookink Team</p>
            <p>Please enter this OTP to verify your identity. Do not share this code with anyone.</p>
            <p class="footer">This OTP is valid for 10 minutes. Please do not reply this email.</p>
        </div>
    </body>
    </html>
    `;
}
