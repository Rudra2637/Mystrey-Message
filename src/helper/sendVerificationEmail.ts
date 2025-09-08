// import {resend} from "@/lib/resend"
// import VerificationEmail from "../../emails/VerificationEmail"
// import { ApiResponse } from "@/types/apiResponse"

// export async function sendVerificationEmail(
//     email:string,
//     userName:string,
//     verifyCode:string
// ):Promise<ApiResponse>{
//     try {
//         const {data,error} = await resend.emails.send({
//             from: 'Acme <notifications@accounts.dev>',
//             to: email,
//             subject: 'Mystry Message Verification Code',
//             react: VerificationEmail({ userName,verifyCode}),
//         })
//         // if(error){
//         //     console.log(error)
//         //     return {success:false,message:"Error in verifcation"}
//         // }
//         return {success:true,message:"Verification Successfull"}
//     } catch (error) {
//         console.error("Error sending VerificationEmail ",error)
//         return {success:false,message:"Failed to send Verification email"}
//     }
// }
const nodemailer = require("nodemailer");
// sendVerificationEmail.ts
import { ApiResponse } from "@/types/apiResponse";


export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your Gmail
        pass: process.env.EMAIL_PASS, // your App Password
      },
    });

    // Mail options
    // const html = render(
    //   VerificationEmail({ username, verifyCode }) // 👈 use your React template
    // );

    const mailOptions = {
      from: "no-reply@mystreymessage.com",
      to: email,
      subject: "Verify your account",
      text: `Hello ${username},\n\nYour verification code is: ${verifyCode}\n\nThis code will expire in 5 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
          <h2>Email Verification</h2>
          <p>Hello <b>${username}</b>,</p>
          <p>Your verification code is:</p>
          <h1 style="color: #4CAF50;">${verifyCode}</h1>
          <p>This code will expire in <b>5 minutes</b>.</p>
          <p>If you did not request this, please ignore this email.</p>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return {
      success: true,
      message: "Verification email sent successfully",
    };
  } catch (error) {
    console.error("Error sending verification email:", error);
    return {
      success: false,
      message: "Failed to send verification email",
    };
  }
}


