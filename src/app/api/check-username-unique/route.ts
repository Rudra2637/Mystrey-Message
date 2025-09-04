import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { userNameValidation } from "@/schemas/signUpSchema";
import z from "zod";


const UsernameQuerySchema = z.object({
    username:userNameValidation
})

export async function GET(request:Request){
    //The url would be something like this localhost:3000/api/cuu?username=xyz here we need to extract username from the url
    
    await dbConnect()
    try {
        const {searchParams} = new URL(request.url)                         //We took the complete url here 
        const queryParam = {
            username:searchParams.get('username')                           //We extracted username from the url
        }
        const result = UsernameQuerySchema.safeParse(queryParam)             //Zod will look into it
        console.log("Result",result)
        if(!result.success){
            const usernameErrors = result.error.format().username?._errors || []
            return Response.json({
                success:false,
                message:usernameErrors?.length > 0?
                usernameErrors.join(',') : 'invalid query parameters'
            },{status:400})
        }
        const {username} = result.data

        const userExist = await UserModel.findOne({username,isVerified:true})
        if(userExist){
            return Response.json({
                success:false,
                message:"Username already exists"
            },{status:500})
        }
        return Response.json({
            success:true,
            message:'Username is available'
        },{status:200})

    } catch (error) {
        console.error("Error in verifying username whether it is unique ",error)
        return Response.json({
            success:false,
            message:"Username already taken"
        },{status:500})
    }
}
