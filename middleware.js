// middleware.js

import { NextResponse } from 'next/server'
import axios from "axios";
export async  function middleware(request) {
  const { pathname } = request.nextUrl
  // Check if the user is trying to access a protected route
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/:path*'], // Apply middleware to /dashboard and its subpaths
}