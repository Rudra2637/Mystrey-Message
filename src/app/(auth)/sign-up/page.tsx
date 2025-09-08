'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z  from "zod"
import Link from "next/link"
import { useDebounceValue,useDebounceCallback } from 'usehooks-ts'
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { signUpSchema } from "@/schemas/signUpSchema"
import axios from 'axios';
import { ApiResponse } from "@/types/apiResponse"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
// const formSchema = z.object({
//   username: z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
// })

const page = () => {
  const [username,setUsername] = useState('')
  const [usernameMessage,setUsernameMessage] = useState('')
  const [isCheckingUsername,setIsCheckingUsername] = useState(false)
  const [isSubmitting,setIsSubmitting] = useState(false)
  const debounced = useDebounceCallback(setUsername,300)
  const router = useRouter()

  const form = useForm({
    resolver:zodResolver(signUpSchema),
    defaultValues:{
      username:"",
      email:"",
      password:""
    }
  })

  useEffect(() => {
    const checkUsernameUnique = async () => {
      
      if(username){
        setIsCheckingUsername(true)
        setUsernameMessage('')
        try {
          const result = await axios.get<ApiResponse>(`/api/check-username-unique?username=${username}`)
          setUsernameMessage(result.data.message)
        } catch (error) {
            console.error("Error in checking unique username")
            setUsernameMessage("Enter a unique username")
        }
        finally{
          setIsCheckingUsername(false)
        }
      }
    }
    checkUsernameUnique()
  },[username])

  const onSubmit = async (data:z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true)
    try {
      const result = await axios.post<ApiResponse>(`/api/sign-up`,data)
      toast(
        <div>
          <strong>{result.data.success ? "Success" : "Error"}</strong>
          <div>{result.data.message}</div>
        </div>
      )
      router.replace(`/verify/${username}`)
    } catch (error) {
        console.error("Error in signing up user")
        toast("Error in signing up user")
    }
    finally{
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join the mystrey message
          </h1>
          <p className="mb-4">Sign up to start your anonymous adventure</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} 
                    onChange = {(e) => {
                      field.onChange(e)
                      debounced(e.target.value)
                    }}
                    />
                  </FormControl>
                  {isCheckingUsername && <Loader2 className = "animate-spin"/>}
                  <p className={`text-sm ${usernameMessage === 'Username is available'? 'text-green-500' :'text-red-500'}`}>
                    {usernameMessage}
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" {...field}
                    type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              {
                isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please Wait
                  </>
                ) : ('Sign Up')
                
              }
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
              <p>
                Already a member?{' '}
                <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
                  Sign in
                </Link>
              </p>
        </div>
      </div>
    </div>
  )
}

export default page