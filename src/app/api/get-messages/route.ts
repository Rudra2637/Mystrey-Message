import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import UserModel from "@/model/User";
import { authOptions } from "../auth/[...nextauth]/options";
import { User } from "next-auth";
import mongoose from "mongoose";

export async function GET(request:Request){
    await dbConnect()
    const session = await getServerSession(authOptions)
    const user = session?.user._id

    if(!session || !session.user){
        return Response.json({
            success:false,
            message:"User is not logged in.Log in to access features"
        },{status:401})
    }
    const userId = new mongoose.Types.ObjectId(user._id)
    try {
        const user = await UserModel.aggregate([
            {$match:{id:userId}},
            {$unwind:"$message"},
            {$sort:{"message.createdAt" : -1}},
            {$group:{_id:"$_id",messages:{$push:"$message"}}}
        ])
        if(!user || user.length === 0){
            return Response.json({
                success:false,
                message:"User not found"
            },{status:404})
        }
        return Response.json({
                success:true,
                message:user[0].message
        },{status:200})

    } catch (error) {
        console.error("Error in fetching all the user's message ",error)
        return Response.json({
            success:false,
            message:"Error in fetching user's messages"
        },{status:500})
    }



}
