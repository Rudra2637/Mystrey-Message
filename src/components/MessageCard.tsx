"use client"
import React from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import { Button } from './ui/button'
import { X } from 'lucide-react'
import { Message } from '@/model/User'
import axios from 'axios'
import { toast } from 'sonner'

type MessageCardProps = {
    message:Message;
    onMessageDelete:(messageId:string) => void
}
const MessageCard = ({message,onMessageDelete}:MessageCardProps) => {

    const handleDeleteConfirm = async () => {
        try {
            console.log("messageId",message._id)
            const response = await axios.delete(`/api/delete-message/${message._id}`)
            onMessageDelete(String(message._id));

            toast(
                <div>
                    <strong>{response.data.success ? "Success" : "Error"}</strong>
                    <div>{response.data.message}</div>
                </div>
            )
            
        } catch (error) {
            console.error("Error in deleteing the message ",error)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{message.content || "No Title"}</CardTitle>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive"><X className="w-5 h-5"/></Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your
                                    account and remove your data from our servers.
                                </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick = {handleDeleteConfirm}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <CardDescription>{message.content || "No Description"}</CardDescription>
                <CardAction>Card Action</CardAction>
            </CardHeader>
            <CardContent>
            
            </CardContent>
            <CardFooter>
                
            </CardFooter>
        </Card>
    )
}

export default MessageCard