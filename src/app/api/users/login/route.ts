import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js"
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

const bcrypt = require('bcryptjs');

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;

        console.log(reqBody);

        //check if user exits
        const user = await User.findOne({email});

        if(!user) {
            return NextResponse.json({error: "User does not exist"}, {status: 400});
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if(!validPassword){
            return NextResponse.json({error: "Incorrect password"}, {status: 400});
        }

        //create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        }

        //create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"});

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        });

        response.cookies.set("token", token, {httpOnly: true, path: '/'});

        return response;

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}