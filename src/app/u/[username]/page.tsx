"use client"
import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { messageSchema } from '@/schemas/messageSchema'
import * as z from 'zod'
import { toast } from 'sonner'
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


const Page = () => {
  const params = useParams()
  const [messageStatus, setMessageStatus] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [loadingSuggestions, setLoadingSuggestions] = useState(false)

  const form = useForm({
    resolver: zodResolver(messageSchema),
    defaultValues: { content: "" },
  })

  const router = useRouter()
  
  

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setMessageStatus(true)
    try {
      const response = await axios.post(`/api/send-message`, {
        username: params.username,
        content: data.content,
      })
      toast(
        <div>
          <strong>{response.data.success}</strong>
          <div>{response.data.message}</div>
        </div>
      )
      form.reset({ content: "" })
    } catch (error) {
      console.error("Error in sending message ", error)
      toast(<div><strong>Error in sending message</strong></div>)
    } finally {
      setMessageStatus(false)
    }
  }

  const fetchSuggestions = async () => {
    setLoadingSuggestions(true)
    try {
      const response = await axios.post('/api/suggest-message')
      console.log("response ",response)
      setSuggestions(response.data.completion.split('||').map((s: string) => s.trim()))
      console.log("suggestions ",suggestions)
      
    }catch (error) {
      console.error("Error fetching suggestions: ", error)
      toast(<div><strong>Error fetching suggestions</strong></div>)
    }finally {
      setLoadingSuggestions(false)
    }
    
  }

  return (
    <div className="container mx-auto my-8 p-6 bg-white rounded max-w-4xl">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Public Profile Link
      </h1>

      {/* Message Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Send Anonymous Message to @{params.username}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your anonymous message here"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            {messageStatus ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" disabled={messageStatus}>
                Send It
              </Button>
            )}
          </div>
        </form>
      </Form>

      {/* AI Suggestions */}
      <p className="m-10 text-center">Click on any suggestion below to use it.</p>
      <Card>
        <CardHeader>
          <CardTitle>Messages</CardTitle>
          <CardDescription>AI Generated Suggestions</CardDescription>
          <CardAction>
            < Button 
              className="ml-auto"
              variant="outline"
              onClick={fetchSuggestions}
              disabled={loadingSuggestions}
            >
              {loadingSuggestions ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Generate"
              )}
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {suggestions.map((suggestion,index) => (
              <CardContent key={index} className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => form.setValue('content', suggestion)}
              >
                { /* eslint-disable-next-line react/no-unescaped-entities */ }
                {suggestion}
              </CardContent>
            ))}
          </div>
        </CardContent>        

        <CardFooter>
          <p className="text-sm text-gray-500">Select a suggestion to autofill the message box</p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Page
