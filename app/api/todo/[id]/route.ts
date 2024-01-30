import prisma from "@/prisma";
import { connectToDb } from "@/utils"
import { NextResponse } from "next/server";

export const GET =async (req:Request,{params}:{params:{id:string}}) => {
    try {
        await connectToDb();
        const todo = await prisma.todos.findFirst({where:{id:params.id}});
        return NextResponse.json({todo })
    } catch (error:any) {
        console.log(error.message)
        return NextResponse.json({error:error.message})
    }finally{
        await prisma.$disconnect();
    }
    
}
export const PUT =async (req:Request,{params}:{params:{id:string}}) => {
    try {
        const {todo} = await req.json()
        await connectToDb();
        const UpdatedTodo = await prisma.todos.update({data:{todo}, where:{id:params.id}});
        return NextResponse.json({UpdatedTodo})
    } catch (error:any) {
        console.log(error.message)
        return NextResponse.json({error:error.message})
    }finally{
        await prisma.$disconnect();
    }
    
}
export const DELETE =async (req:Request,{params}:{params:{id:string}}) => {
    try {
      
        await connectToDb();
        const UpdatedTodo = await prisma.todos.delete({where:{id:params.id}});
        return NextResponse.json({UpdatedTodo})
    } catch (error:any) {
        console.log(error.message)
        return NextResponse.json({error:error.message})
    }finally{
        await prisma.$disconnect();
    }
    
}