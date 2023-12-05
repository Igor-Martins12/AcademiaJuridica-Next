import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

 export async function PATCH(
    req:Request,
    {params }: { params: { courseId: string; video: string; chapterId: string} }
    ) {
        try{
            const { userId } = auth();
            console.log("Dados recebidos no servidor:", params);

            if(!userId) { 
                return new NextResponse("Não autorizado", { status: 401 });
            }
            if (!params || !params.courseId || !params.video || !params.chapterId) {
              return new NextResponse("Parâmetros inválidos", { status: 400 }) }
              
            const courseOwner = await db.course.findUnique({ 
                where: {
                    id: params.courseId,
                    userId: userId,
                }
            });
            
            if (!courseOwner) { 
                return new NextResponse("Não autorizado", { status: 401 });
            }
            
            const savedVideo = await db.video.create({ 
                data: { 
                    videoUrl: params.video,
                    chapterId: params.chapterId,
                    courseId: params.courseId,
                }
            });
            return NextResponse.json(savedVideo);
        } catch(error) {
            console.log("COURSE_ID_ATTACHMENTS", error);
            return new NextResponse("Internal Erro", {status: 500});
        }
}