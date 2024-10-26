// import {connect} from "@/dbConfig/dbConfig.js";
import {Users} from '@/models/userModel';
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { connectionSrt } from "@/models/dbMongo";




export async function POST(request:any){
    try {
    const body = await request.json();
    const {name,email,password} = body;
    console.log("Request Body:", body); 

    await mongoose.connect(connectionSrt);

    // const existing = await Users.findOne({name});
    // if(existing){
    //     return NextResponse.json({ error:"Email exists"}, {status: 400})
    // }

    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)
    const newUser = new Users({
        name,
        email,
        password: hashedPassword,
        // password:password
    })
    console.log("New User Data:", newUser); 
    const result = await newUser.save()
    console.log("Saved User:", result);
    return NextResponse.json({result, success: true})


    } catch (error) {
        return NextResponse.json({error: error},
            {status: 500})
    }
}