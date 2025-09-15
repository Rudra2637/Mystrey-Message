"use client"
import React from "react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { User } from "next-auth"
import { Button } from "./ui/button"

const Navbar = () => {
  const { data: session } = useSession()
  const user: User = session?.user

  return (
    <nav className="p-4 md:p-6 shadow-md bg-white">
      <div className="container mx-auto flex flex-wrap md:flex-nowrap justify-between items-center gap-4">
        
        <a className="text-xl font-bold tracking-tight" href="#">
          Mystrey Message
        </a>

        <div className="flex items-center gap-3 md:gap-4">
          {session ? (
            <>
              <span className="text-sm md:text-base whitespace-nowrap">
                Welcome, {user?.username || user?.email}
              </span>
              <Button
                variant="outline"
                className="w-full md:w-auto"
                onClick={() => signOut()}
              >
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Link href="/sign-up">
                <Button className="w-full md:w-auto">Sign Up</Button>
              </Link>
              <Link href="/sign-in">
                <Button className="w-full md:w-auto">Login</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
