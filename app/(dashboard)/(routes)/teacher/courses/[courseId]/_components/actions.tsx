"use client";

import { ConfirmModel } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { set } from "zod";



interface ActionsProps { 
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
}


export const Actions = ({
  disabled,
  courseId,
  isPublished
 }: ActionsProps ) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => { 
    try { 
      setIsLoading(true);

      if(isPublished) {
        await axios.patch(`/api/courses/${courseId}/unpublish`);
        toast.success("Curso não publicado");
      } else {
        await axios.patch(`/api/courses/${courseId}/publish`);
        toast.success("Publicação de curso.")
      }
      router.refresh();
    } catch { 
      toast.error("Algo deu errado");
    } finally { 
      setIsLoading(false);
    }
  }


  const onDelete = async () => { 
    try { 
      setIsLoading(true);

     await axios.delete(`/api/courses/${courseId}`);

     toast.success("Curso deletado")
     router.refresh();
     router.push(`/teacher/courses`)
    } catch { 
        toast.error("Algo deu errado")
    }finally { 
      setIsLoading(false)
    }
  }
  
  return (
    <div className="flex items-center gap-x-2">
      <Button onClick={onClick}
       disabled={disabled || isLoading}
       variant="outline"
       size="sm"
      > 
       { isPublished ? "Cancelar publicação" : "Publicar"}
      </Button>
      <ConfirmModel onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading} >
          <Trash className="h-4 w-4" /> 
        </Button>
      </ConfirmModel>
    </div>
  )
}