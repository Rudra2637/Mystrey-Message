"use client"
import React,{ useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { verifySchema } from '@/schemas/verifySchema'
import * as z from 'zod'
import { toast } from 'sonner'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { Button } from '@/components/ui/button'

const page = () => {
    const [codeCheck,isCheckingCode] = useState(false)
    const params = useParams()
    const router = useRouter()
    const form = useForm({
        resolver:zodResolver(verifySchema),
    })

    const onSubmit = async (data:z.infer<typeof verifySchema>) => {
        
        try {
            const result = await axios.post(`/api/verify-code`,{
                username:params.username,
                code:data.code
            })
            isCheckingCode(true)
            toast(
                <div>
                <strong>{result.data.success ? "Success" : "Error"}</strong>
                <div>{result.data.message}</div>
                </div>
            )
            router.replace(`/sign-in`)
        } catch (error) {
            console.error("Error in signing up user")
            toast("Error in signing up user")
        }
        finally{
            isCheckingCode(false)
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                        Verify Your Account
                    </h1>
                    <p className="mb-4">Enter the verification code sent to your email <strong>check your spam folder</strong></p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                        name="code"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>One-Time Password</FormLabel>
                            <FormControl>
                                <InputOTP maxLength={6} {...field}>
                                <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                                </InputOTPGroup>
                                </InputOTP>
                            </FormControl>
                            <FormDescription>
                                Please enter the one-time password sent to your gmail.
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button type="submit" disabled={codeCheck}>
                            {
                                codeCheck ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please Wait
                                </>
                                ) : ('Verify ')
                                
                            }
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default page