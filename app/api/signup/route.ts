import prisma from "@/prisma";
import { connectToDb } from "@/utils"
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'

export const POST =async (req:Request) => {
    try {
        const {name, email, password} = await req.json(); 
        if(!name && !email  && !password){
            return NextResponse.json({error:"Invalid Credentials"})
        }
        await connectToDb();
        const existingUser = await prisma.user.findFirst({where:{email}})
        if(existingUser){
            return NextResponse.json('user already registed')
        }
        const hasdedPassword = await bcrypt.hash(password,10)
        const user = await prisma.user.create({data:{name, email, password:hasdedPassword}});
        return NextResponse.json({user})
    } catch (error:any) {
        console.log(error.message)
        return NextResponse.json({error:error.message})
    }finally{
        await prisma.$disconnect();
    }
    
}