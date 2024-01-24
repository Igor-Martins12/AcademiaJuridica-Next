import Image from "next/image";
import Link from "next/link";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  price: number;
  progress: number | null;
  category: string;
};

export const CourseCard = ({
id, 
title,
imageUrl,
chaptersLength,
price,
progress,
category
}:CourseCardProps ) => {
  return (
    <Link href={`/courses/${id}`}> 
    <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
      <div className="relative w-full aspect-video rounded-md overflow-hidden">
        <Image 
        fill
        className="object-cover"
        alt={title}
        src={imageUrl}
         />
      </div>
    </div>
      Course card 
    </Link>
  )
}