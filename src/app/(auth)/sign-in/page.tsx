"use client"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { signInSchema } from '@/schemas/signInSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

const page = () => {
  const [isChecking,setIsChecking] = useState(false)
  const router = useRouter()

  const form = useForm({
    resolver:zodResolver(signInSchema),
    defaultValues:{
      identifier:"",
      password:""
    }
  })
  const onSubmit = async (data:z.infer<typeof signInSchema>) => {
    const result = await signIn('credentials',{
      redirect:false,
      identifier:data.identifier,
      password:data.password
    })
    if(result?.error){
      toast(
        <div>
          <strong>Login Failed</strong>
          <div>Invalid Credentials</div>
        </div>
      )
    }
    if(result?.url){
      toast(
        <div>
          <strong>Login Success</strong>
        </div>
      )
      router.replace('/dashboard')
    }
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Sign In
          </h1>
          <p className="mb-4">Sign In to start your anonymous adventure</p>
        </div>
        <Form {...form}> 
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Sign In</Button>
          </form>

        </Form>
        <div className="text-center mt-4">
              <p>
                Not signed up yet?{' '}
                <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
                  Sign up
                </Link>
              </p>
        </div>
      </div>
    </div>
  )
}

export default page