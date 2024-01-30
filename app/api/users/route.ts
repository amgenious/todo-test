import prisma from "@/prisma";
import { connectToDb } from "@/utils"
import { NextResponse } from "next/server";

export const GET =async (req:Request) => {
    try {
        await connectToDb();
        const user = await prisma.user.findMany({include:{todos:true,_count:true}});
        return NextResponse.json({user})
    } catch (error:any) {
        console.log(error.message)
        return NextResponse.json({error:error.message})
    }finally{
        await prisma.$disconnect();
    }
    
}