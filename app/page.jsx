'use client'
import React from "react";
import { useAbly, useConnectionStateListener } from 'ably/react';
import Navbar from "@/components/Navbar";
import Recharg from "@/components/Recharg";
import { useAuth } from '@/context/AuthProvider';
import axios from "axios";
import { useCookiesNext } from 'cookies-next';
import { useState, useContext,useEffect ,useRef } from "react";
const Home = () => {
  const { setCookie, hasCookie, deleteCookie, getCookies, getCookie } = useCookiesNext();
    const { user, login, logout ,setUser } = useAuth();

 useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
     
      
    }else{
       axios.get("https://api.ipinfo.io/lite/8.8.8.8?token=fe326301ae0dd9").then(function (res) {
     localStorage.setItem('ipinfo', JSON.stringify(res.data));
  login();
       
     });


    }
     //console.log(storedUser)
      //console.log(getCookie('userid'))
  }, []);


  // useConnectionStateListener hook listens for changes in connection state
 


  return (
    <>
    
      <Navbar/>
       
      <div className="p-2">
       <Recharg/>
      </div>
    
    </>
  );
};

export default Home;
