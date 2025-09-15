"use client"
import React from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "./ui/button"
import { X } from "lucide-react"
import { Message } from "@/model/User"
import axios from "axios"
import { toast } from "sonner"

type MessageCardProps = {
  message: Message
  onMessageDelete: (messageId: string) => void
}

const MessageCard = ({ message, onMessageDelete }: MessageCardProps) => {
  const handleDeleteConfirm = async () => {
    try {
      console.log("messageId", message._id)
      const response = await axios.delete(`/api/delete-message/${message._id}`)
      onMessageDelete(String(message._id))

      toast(
        <div>
          <strong>{response.data.success ? "Success" : "Error"}</strong>
          <div>{response.data.message}</div>
        </div>
      )
    } catch (error) {
      console.error("Error in deleting the message ", error)
    }
  }

  return (
    <div className="relative max-w-md bg-gray-100 rounded-2xl px-5 py-4 shadow-sm hover:shadow-md transition duration-200 before:content-[''] before:absolute before:-left-2 before:top-6 before:w-4 before:h-4 before:bg-gray-100 before:rounded-bl-2xl before:rotate-45">
      {/* Small Cross Button */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-7 w-7 p-0 text-gray-500  hover:text-red-600"
          >
            <X className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              message.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Message Content */}
      <p className="text-base text-gray-800 leading-relaxed font-bold">
        {message.content || "No message provided"}
      </p>

      <span className="block mt-2 text-xs text-gray-500">
        — Anonymous
      </span>
    </div>
  )
}

export default MessageCard
