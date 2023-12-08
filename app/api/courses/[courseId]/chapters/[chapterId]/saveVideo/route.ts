import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function POST(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string; } }
) {
  try {
    console.log("Dados recebidos no servidor:", params);
    const { userId } = auth();
    const { urlVideo } = await req.json();


    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      }
    });

    if (!courseOwner) {
      return new NextResponse("Não autorizado", { status: 401 });
    }
    const chapter = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      include: {
        reactData: true,
      }

    });

    if (!chapter) {
      return new NextResponse("Não autorizado", { status: 401 });
    }
    console.log(urlVideo)
    const reactData = await db.reactData.create({ 
      data: { 
        chapterId: params.chapterId,
          urlVideo: urlVideo,
      }
  });
  return NextResponse.json(reactData);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
