import prisma from "@/prisma"
export const connectToDb = async () => {
    try{
        await prisma.$connect()
    }catch(error:any){
        console.log(error.message)
    }
}