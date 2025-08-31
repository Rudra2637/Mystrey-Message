import {resend} from "@/lib/resend"
import VerificationEmail from "../../emails/VerificationEmail"
import { ApiResponse } from "@/types/apiResponse"

export async function sendVerificationEmail(
    email:string,
    userName:string,
    verifyCode:string
):Promise<ApiResponse>{
    try {
        const {data,error} = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Mystry Message Verification Code',
            react: VerificationEmail({ userName,verifyCode}),
        })
        if(error){
            return {success:false,message:"Error in verifcation"}
        }
        return {success:true,message:"Verification Successfull"}
    } catch (error) {
        console.error("Error sending VerificationEmail ",error)
        return {success:false,message:"Failed to send Verification email"}
    }
}