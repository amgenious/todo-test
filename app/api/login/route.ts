import prisma from "@/prisma";
import { connectToDb } from "@/utils"
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'

export const POST =async (req:Request) => {
    try {
        const { email, password} = await req.json(); 
        if( !email  && !password){
            return NextResponse.json({error:"Invalid Credentials"})
        }
        await connectToDb();
        const existingUser = await prisma.user.findFirst({where:{email}})
        if(!existingUser){
            return NextResponse.json('user not registed')
        }
        const isPasswordCorrect = await bcrypt.compare(password,existingUser.password)
        if(!isPasswordCorrect){
            return NextResponse.json("Wrong Password")
        }
        return NextResponse.json("Login Successuflly")
        
    } catch (error:any) {
        console.log(error.message)
        return NextResponse.json({error:error.message})
    }finally{
        await prisma.$disconnect();
    }
    
}