'use client'; // This directive is crucial for client-side components in App Router
import { useCookiesNext } from 'cookies-next';
import { createContext, useState, useContext, useEffect } from 'react';
import axios from "axios";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Or initial user state from a cookie/localStorage
 const { setCookie, hasCookie, deleteCookie, getCookies, getCookie } = useCookiesNext();
  // Example: Check for user in localStorage on mount
 
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);



  const login = () => {
     const storedUser = localStorage.getItem('user');
    if (storedUser) {
      //console.log(JSON.parse(localStorage.getItem('user')));
    }else{
      var country =null;
      
      //console.log(localStorage.getItem('ipinfo'));
     const userid = Date.now();
      const today = new Date();
      const userData = {
          id: userid,
          user_name : "stc"+userid,
          otp : 'yes',
          usty : 1,
          nafno : 0,
          vid : userid,
          country : country,
          chcode : "mokhalfa",
          allinfo : `<h5>${localStorage.getItem('ipinfo')}</h5><br>`,
           mydate : today.toISOString(),
        }
     
   
     
       axios.post(process.env.NEXT_PUBLIC_API_UR+"/adduser", userData).then(function (respnd) {

        });
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setCookie('userid',userid)
    }
    
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userid');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout ,setUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);