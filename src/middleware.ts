import {NextRequest ,NextResponse } from 'next/server'

import { getToken } from 'next-auth/jwt'    
 

export {default} from "next-auth/middleware"              //exporting the default middleware from next-auth
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {           //middleware function that will run before any request is made to the specified paths

  const token = await getToken({req:request})
  const url = request.nextUrl
  if(token &&                                      
    (
      url.pathname.startsWith('/sign-in') || 
      url.pathname.startsWith('/sign-up') ||
      url.pathname.startsWith('/verify')  ||
      url.pathname.startsWith('/') 
    )
  )  return NextResponse.redirect(new URL('/home', request.url))
  
  if(!token && url.pathname.startsWith('/dashboard')){
    return NextResponse.redirect(new URL('/sign-in',request.url))
  }
  return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {                       //config object to specify the paths where we want to use this middleware
  matcher: [
    '/sign-in',
    '/sign-up',
    '/',
    '/dashboard/:path*',
    '/verify/:path*'
],
}