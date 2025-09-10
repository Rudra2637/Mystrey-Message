"use client"

import MessageCard from "@/components/MessageCard"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Message } from "@/model/User"
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { Loader2, RefreshCcw } from "lucide-react"
import { useSession } from "next-auth/react"
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

const page = () => {
  const [messages,setMessages] = useState<Message[]>([])
  const [isLoading,setIsLoading] = useState(false)
  const [isSwitchLoading,setIsSwitchLoading] = useState(false)

  const handleDeleteMessage = (messageId:string) => {
    setMessages(messages.filter((item) => item.id !== messageId ))
  }

  const {data:session} = useSession()

  const form = useForm({
    resolver:zodResolver(acceptMessageSchema)
  })

  const {register,watch,setValue} = form

  const isAcceptingMessage = watch('isAcceptingMessage')

  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitchLoading(true)
    try {
      const response = await axios.get(`/api/accept-messages`)
      setValue('isAcceptingMessage',response.data.isAcceptingMessage)
      toast(
        <div>
          <strong>{response.data.success ? "Success" : "Error"}</strong>
          <div>{response.data.message}</div>
        </div>
      )
    } catch (error) {
        console.error("Error in fetching state of message ",error)
        toast(
          <div>
            <div>Error in fetching state</div>
          </div>
        )
    }
    finally{
      setIsSwitchLoading(false)
    }
  },[setValue])

  const fetchMessages = useCallback(async (refresh:boolean = false) => {
    setIsLoading(true)
    setIsSwitchLoading(true)
    try {
      const response = await axios.get(`/api/get-messages`)
      setMessages(response.data.messages || [])
      if(refresh){
        toast(
          <div>
            <strong>Refreshed Messages</strong>
            <div>Showing Latest Messages </div>
          </div>
        )
      }
      
    } catch (error) {
        console.error("Error in fetching messages ",error)
        toast(
          <div>
            <div>Error in fetching state</div>
          </div>
        )
    }
    finally{
      setIsLoading(false)
      setIsSwitchLoading(false)
    }
  },[setIsLoading,setMessages])

  useEffect(() => {
    if(!session || !session.user)return 
    fetchMessages()
    fetchAcceptMessage()
    
  },[session,setValue,fetchAcceptMessage,fetchMessages])

  const handleSwitchChange = async () => {
    try {
      const response = await axios.post(`/api/accept-messages`,{
        acceptMessage:!isAcceptingMessage
      })
      setValue('isAcceptingMessage',!isAcceptingMessage)
      toast(
          <div>
            <div>{response.data.message}</div>
          </div>
        )
    } catch (error) {
        console.error("Error in updating state ",error)
        toast(
          <div>
            <div>Error in fetching state</div>
          </div>
        )
    }
  }

  const {username} = session?.user 
  const baseUrl = `${window.location.protocol}//${window.location.host}`
  const profileUrl = `${baseUrl}/u/${username}`
  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl)
    toast(
      <strong>
        Link Copied Successfully
      </strong>
    )
  }

  if(!session || !session.user){
    return <div>Please Login</div>
  }

  return (
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
      <h1 className="text-4xl font-bold mb-4">User Dashboard</h1>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Copy Your Unique Link</h2>{' '}
        <div className="flex items-center">
          <input
            type="text"
            value={profileUrl}
            disabled
            className="input input-bordered w-full p-2 mr-2"
          />
          <Button onClick={copyToClipboard}>Copy</Button>
        </div>
      </div>

      <div className="mb-4">
        <Switch
          {...register('isAcceptingMessage')}
          checked={isAcceptingMessage}
          onCheckedChange={handleSwitchChange}
          disabled={isSwitchLoading}
        />
        <span className="ml-2">
          Accept Messages: {isAcceptingMessage ? 'On' : 'Off'}
        </span>
      </div>
      <Separator />

      <Button
        className="mt-4"
        variant="outline"
        onClick={(e) => {
          e.preventDefault();
          fetchMessages(true);
        }}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <RefreshCcw className="h-4 w-4" />
        )}
      </Button>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <MessageCard
              key={String(message._id)}
              message={message}
              onMessageDelete={handleDeleteMessage}
            />
          ))
        ) : (
          <p>No messages to display.</p>
        )}
      </div>
    </div>
  );
}


export default page