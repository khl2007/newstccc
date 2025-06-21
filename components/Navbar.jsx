"use client"
import React from "react";
import { assets } from "@/assets/assets";
import Link from "next/link"

import Image from "next/image";


const Navbar = () => {

  

  return (
     <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="HeaderMobileNavBar max-w-(--breakpoint-xl) flex flex-wrap items-center justify-between mx-auto p-2">
           <div className="flex flex-wrap items-center justify-between">
                  <button
                    data-collapse-toggle="navbar-default"
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-hidden focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-default"
                    aria-expanded="false"
                >
                    <span className="sr-only">Open main menu</span>
                    <Image
                        alt="navigation"
                        
                        loading="eager"
                        src={assets.burgerpurple}
                        style={{ height: 24, width: 24 }}
                    />
                </button>
                <a
                    href="#"
                    className="flex items-center space-x-3 rtl:space-x-reverse"
                >
                    <Image
                        alt="stc-logo"
                        
                        loading="eager"
                        className="HeaderMobileNavBar_logoIcon__MBvo7"
                        src={assets.logo}
                    />
                </a>
               
           </div>
                <div className="  md:w-auto" id="navbar-default">
                    <ul className="font-medium flex   border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <a
                                href="#"
                                className="block py-2 px-3 text-white   md:p-0 "
                                aria-current="page"
                            >
                              <Image alt="search"  loading="eager" className="HeaderMobileNavBar_searchLogo__EZMQf" src={assets.search} />

                            </a>
                        </li>
                         <li>
                            <a
                                href="#"
                                className="block py-2 px-3 text-white   md:p-0 "
                                aria-current="page"
                            >
                              <Image alt="search"  loading="eager" className="HeaderMobileNavBar_searchLogo__EZMQf" src={assets.carticon} />

                            </a>
                        </li>
                         <li>
                            <a
                                href="#"
                                className="block py-2 px-3 text-white   md:p-0 "
                                aria-current="page"
                            >
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="StcIcon_wrapper__su94P HeaderMobileNavBar_profileIcon__chmhB">
              <path fill="currentColor" fillRule="evenodd" d="M18.579 12C21.02 12 23 13.79 23 16v4c0 2.21-1.98 4-4.421 4H2v-8c0-2.21 1.98-4 4.421-4zm.154 2H6.267C5.015 14 4 14.895 4 16v6h14.733C19.985 22 21 21.105 21 20v-4c0-1.105-1.015-2-2.267-2M12.5 0a5.5 5.5 0 1 1 0 11 5.5 5.5 0 1 1 0-11m0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7">
              </path>
            </svg>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
  );
};

export default Navbar;