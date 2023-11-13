import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
 // verifica se o usuario existe para fazer upload 
const handleAuth = () => { 
    const { userId } = auth();
    if ( !userId ) throw new Error("Não autorizado")
    return { userId };
 }; 
 
// upload de arquivos 
export const ourFileRouter = {
    courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .middleware(() => handleAuth())
        .onUploadComplete(() => {}),

    courseAttachment: f(["text", "image", "video", "audio", "pdf"])
        .middleware(() => handleAuth())
        .onUploadComplete(() => {}),

    chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "512GB" } }) 
        .middleware(() => handleAuth())
        .onUploadComplete(() => {})
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;