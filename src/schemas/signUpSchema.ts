import {z} from "zod";

export const userNameValidation = z
.string()
.min(2,"UserName must have atleast 2 characters")
.max(20,"UserName should be no more than 20 characters")
.regex(/^[A-Za-z0-9_]+$/,"UserName should not contain special Characters")

export const signUpSchema = z.object({
    username:userNameValidation,
    email:z.string().email({message:"Invalid Email"}),
    password:z.string().min(6,"Password should be minimum 6 characters")
})

