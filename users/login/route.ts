// import { connect } from "mongoose";
// import User from "@/models/userModel";
import mongoose from "mongoose";
// import { connectionSrt } from "@/models/dbmongo";
import { NextResponse } from "next/server";
import { Users } from "@/models/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import { connectionSrt } from '@/models/dbMongo';
// connect();

export async function POST(request:any){
    try{
        const body = await request.json();
    const {email,password} = body;

    await mongoose.connect(connectionSrt);

    const user = await Users.findOne({email})
    if(!user){
        return NextResponse.json({error: "User does not exist"},{status:400})
    }

    const validPass = await bcryptjs.compare(password, user.password)
    if(!validPass){
        return NextResponse.json({error: "Invalid Password"}, {status: 400})
    }

    const tokenData = {
        id: user._id,
        email: user.email
    }


    const token = await jwt.sign(tokenData, "secretkey", {expiresIn: "1d"})

    const result = NextResponse.json({
        message:"Login Successful",
        success:true,
    })
    result.cookies.set("token",token,{httpOnly:true,})
    return result;

    }catch(error:any){
        return NextResponse.json({error: error.response},
            {status: 500})
    }
}