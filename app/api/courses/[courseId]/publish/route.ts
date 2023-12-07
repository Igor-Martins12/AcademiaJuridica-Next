import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  {params } : {params: {courseId: string} }
) {
  try {
    const { userId } = auth(); 

    if(!userId) { 
      return new NextResponse("Unauthorized", {status: 401});
    }
    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
      include: {
        chapters:{
          include:{
            muxData: true,
          }
        }
      }
    })
  } catch (error) {
    console.log("[COURSE_ID_PUBLISH]", error);
    return new NextResponse("Internal Error", {status: 500});
  }
}