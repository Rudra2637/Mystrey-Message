import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";

export async function POST(request:Request){
    await dbConnect()
    const session = await getServerSession(authOptions)    //By doing this we can retrieve the session where we have stored user information
    // const user:User = session?.user as User
    const user = session?.user

    if(!session || !session.user){
        return Response.json({
            success:false,
            message:"User is not logged in.Log in to access features"
        },{status:401})
    }
    const userId = user._id
    const {acceptMessage} = await request.json()

    try {
        const user = await UserModel.findByIdAndUpdate(userId,
            {isAcceptingMessage:acceptMessage},
            {new:true}
        )
        if(!user){
            return Response.json({
                success:false,
                message:"Failed to update the user status to accept message"
            },{status:404})
        }
        return Response.json({
            success:true,
            message:"Message accept status updated successfully",
            user
        },{status:200})
        
    } catch (error) {
        console.error("Failed to update the user status to accept message ",error)
        return Response.json({
            success:false,
            message:"Failed to update the user status to accept message"
        },{status:500})
    }
    
}

export async function GET(request:Request){
    await dbConnect()
    const session = await getServerSession(authOptions)
    const user = session?.user

    if(!session || !session.user){
        return Response.json({
            success:false,
            message:"User is not logged in.Log in to access features"
        },{status:401})
    }
    const userId = user._id

    try {
        const foundUser = await UserModel.findById(userId)
        if(!foundUser){
            return Response.json({
                success:false,
                message:"Failed to retireve user"
            },{status:401})
        }
        return Response.json({
            success:true,
            isAcceptingMessage:foundUser.isAcceptingMessage
        },{status:200})

    } catch (error) {
        console.error("Failed to retrieve the user's status ",error)
        return Response.json({
            success:false,
            message:"Error in getting message acceptance status"
        },{status:500})
    }



}




// try {                                                          //It requires authOptions
//         const toggle = await UserModel.findById(user?._id)
//         if(toggle){
//             if(toggle.isAcceptingMessage){
//                 toggle.isAcceptingMessage = false
//             }
//             else toggle.isAcceptingMessage = true
//             await toggle.save()
//         }
//         else return Response.json({
//             success:false,
//             message:"Some kind of internal error occurred"
//         },{status:500})

//     } catch (error) {
//         console.error("Error in ",error)
//         return Response.json({
//             success:false,
//             message:""
//         },{status:500})
//     }