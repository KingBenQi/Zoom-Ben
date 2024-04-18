"use server";

//server action: executing only on the server that does the logic
//create the streamclient wit APIkey and APIsecret

//streamclient then create the Token


import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async ()=>{
    const user = await currentUser();

    if(!user) throw new Error("User is not logged in");
    if(!apiKey) throw new Error("No API KEY");
    if(!apiSecret) throw new Error("No API SECRET");

    const client = new StreamClient(apiKey, apiSecret);

    const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;

    //client.createToken(userId, exp);
    const issued = Math.floor(Date.now() / 1000) - 60;

    const token = client.createToken(user.id, exp, issued);
    return token
}