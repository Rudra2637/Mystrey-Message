import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helper/sendVerificationEmail";
import VerificationEmail from "../../../../emails/VerificationEmail";



export async function POST(request:Request){
    await dbConnect()
    try {
        const {username,email,password} = await request.json()
        const userExist = await UserModel.findOne({
            username,
            isVerified:true
        })
        
        if(userExist){
            return Response.json({
                success:false,
                message:"User Name already Exists"
            },{status:500})
        }
        const emailExist = await UserModel.findOne({email})
        const verifyCode = Math.floor(100000 + Math.random() * 90000).toString()
        if(emailExist){
            if(emailExist.isVerified){
                return Response.json({
                    success:false,
                    message:"User Exist with this email"
                },{status:400})
            }
            else{
                const hashPassword = await bcrypt.hash(password,10)
                emailExist.password = hashPassword
                emailExist.verifyCode = verifyCode
                emailExist.verifyCodeExpiry = new Date(Date.now() + 3600000)
                await emailExist.save()
            }
        }
        else{
            const hashPassword = await bcrypt.hash(password,10)
            const codeExpiry = new Date()
            codeExpiry.setHours(codeExpiry.getHours() + 1)
            const newUser = await new UserModel({
                    username:username,
                    email,
                    password:hashPassword,
                    verifyCode,
                    verifyCodeExpiry:codeExpiry,
                    isVerified:false,
                    isAcceptingMessage:true,
                    message:[]
            })
            await newUser.save()
        }
        const emailResponse = await sendVerificationEmail(
            email,username,verifyCode
        )
        if(!emailResponse.success){
            return Response.json({
                success:false,
                message:emailResponse.message
            },{status:500})
        }
        return Response.json({
            success:true,
            message:"User resgistered Successfully,Please Verify the email"
        },
        {status:201})

    } catch (error) {
        console.error("Error in registering user ",error)
        return Response.json(
            {
                success:false,
                message:"Error in registering user"
            },
            {
                status:500
            }
        )
    }
}