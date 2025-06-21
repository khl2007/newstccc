'use client'
import { useCookiesNext } from 'cookies-next';

import "./globals.css";
  import { Noto_Kufi_Arabic } from 'next/font/google'
  
import { Toaster } from "react-hot-toast";
import * as Ably from 'ably';
import { AblyProvider } from 'ably/react';
import { AuthProvider } from '@/context/AuthProvider';
import { ChannelProvider } from 'ably/react';
import { CookiesNextProvider } from "cookies-next";

const noto = Noto_Kufi_Arabic({
      subsets: ['latin'],
      weight: '400',
    })
 
export default function RootLayout({ children }) {

  const { setCookie, hasCookie, deleteCookie, getCookies, getCookie } = useCookiesNext();

  
 setCookie('blocked', 'value');
  return (
     <html lang="ar" dir="rtl">
        <body className={` antialiased text-gray-700 rubik`} >
          <Toaster />
        
              <AuthProvider>
                  <CookiesNextProvider pollingOptions={{ enabled: true, intervalMs: 1000 }}>
               
   {children}
   </CookiesNextProvider>
            </AuthProvider>
            
        
           
       
        </body>
      </html>
  );
}
