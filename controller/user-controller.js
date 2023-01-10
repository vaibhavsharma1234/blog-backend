import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import express, { urlencoded } from 'express';

import Token from '../model/token.js'
import User from '../model/user.js';

dotenv.config();

export const singupUser = async (request, response) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(request.body.password, salt);
        // const hashedPassword = await bcrypt.hash(request.body.password, 10);
        // console.log(request.body);
        const user = { username: request.body.username, name: request.body.name, password: hashedPassword }
        console.log(user);
        const newUser = new User(user);
        await newUser.save();

        return response.status(200).json({ msg: 'Signup successfull' });
    } catch (error) {
        console.log(error)
        return response.status(500).json({ msg: 'Error while signing up user' });
    }
}
export const loginUser = async (request, response) => {

    // check ki  username exists
    // console.log(request.body.username );
    let user = await User.findOne({ username: request.body.username });
    if (!user) {
        // console.log(user);
        return response.status(400).json({ msg: "username not match" })
    }
   

    try {
        let match = await bcrypt.compare(request.body.password, user.password);
        if (match) {
            // generate access and refresh token jwt
            // access n=expires in 15 minutes  
            // by existing refresh token we can requesta access token gain
            // access  mai body and secret key
            // jisbhi mai dotenv chaye toh import amd config kro
            const accessToken=jwt.sign(user.toJSON(),process.env.ACCESS_SECRET_KEY,{expiresIn:"15m"});
            const refreshToken=jwt.sign(user.toJSON(),process.env.REFRESH_SECRET_KEY);


            // when access token expires we want to generate the acces again by refresh
            // verify the refresh token;
            const newToken = new Token({token:refreshToken});
            await newToken.save();
            // nextt time i willjust see whether this token exist or not if not then access will not be generated
            // exist then generate the access token;

            return response.status(200).json({accessToken:accessToken,refreshToken:refreshToken,name:user.name,username:user.username,isSuccess:true});

        }
        else{
            return response.status(400).json({ msg: "password not match" })
        }
    } catch (error) {
        console.log(error);
        return response.status(500).json({ msg: "error while  logging in the user" })
    }
}

