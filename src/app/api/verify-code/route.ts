import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import z from "zod";
import { verifySchema } from "@/schemas/verifySchema";

export async function POST(request:Request){
    await dbConnect()
    try {
        const {username,code} = await request.json()
        const decodedUsername = decodeURIComponent(username)
        verifySchema.parse({ code });
        const user = await UserModel.findOne({username:decodedUsername})
        
        if(!user){
            return Response.json({
                success:false,
                message:"user not found"
            },{status:405})
        }
        const validateCode = user.verifyCode === code
        const expiryValidate = new Date(user.verifyCodeExpiry) > new Date()

        if(validateCode && expiryValidate){
            user.isVerified = true
            await user.save()
            return Response.json({
                success:true,
                message:"Account verified Successfully"
            },{status:201})
        }
        else if(!expiryValidate){
            return Response.json({
                success:false,
                message:"Code Expired please sign up again to get new code"
            },{status:500})
        }
        else{
            return Response.json({
                success:false,
                message:"Wrong code"
            },{status:405})
        }

    } catch (error) {
        console.error("Error in verifying code ",error)
        return Response.json({
            success:false,
            message:"Error in verifying code"
        })
    }
}