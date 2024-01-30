import prisma from "@/prisma";
import { connectToDb } from "@/utils"
import { NextResponse } from "next/server";

export const GET =async (req:Request) => {
    try {
        await connectToDb();
        const todo = await prisma.todos.findMany();
        return NextResponse.json({todo})
    } catch (error:any) {
        console.log(error.message)
        return NextResponse.json({error:error.message})
    }finally{
        await prisma.$disconnect();
    }
    
}

export const POST =async (req:Request) => {
    try {
        const {todo, userId} = await req.json(); 
        if(!todo && !userId){
            return NextResponse.json({error:"No todo created"})
        }
        await connectToDb();
        const user = await prisma.user.findFirst({where:{id:userId}});
        if(!user){
            return NextResponse.json('Invalid User')
        }
        const createdTodo = await prisma.todos.create({data:{todo, userId}});
        return NextResponse.json({createdTodo})
    } catch (error:any) {
        console.log(error.message)
        return NextResponse.json({error:error.message})
    }finally{
        await prisma.$disconnect();
    }
    
}