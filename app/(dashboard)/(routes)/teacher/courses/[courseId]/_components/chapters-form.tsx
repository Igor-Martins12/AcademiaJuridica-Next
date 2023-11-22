"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter, Course } from "@prisma/client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { ChaptersList } from "./chapters-list";

interface ChaptersFormProps {
    initialData: Course & {chapters: Chapter[]}
    courseId: string;
};
const formSchema = z.object({
    title: z.string().min(1),
});
export const ChaptersForm = ({
    initialData,
    courseId
}: ChaptersFormProps) => {
    const [isCreating, setIsCreating] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false)
    const toggleCreating = () => { setIsCreating((current) => !current); }
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    });
    const { isSubmitting, isValid } = form.formState;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`/api/courses/${courseId}/chapters`, values)
            toast.success("Capítulo criado");
            toggleCreating();
            router.refresh();
        } catch {
            toast.error("Algo deu errado");
        }
    }
    const onReorder = async ( updateData: { id: string; position: number}[]) => {
        try { 
          setIsUpdating(true);

            await axios.put(`/api/courses/${courseId}/chapters/reorder`,{ 
                list: updateData
            });
            toast.success("Capítulos atualizado");
            router.refresh();
        } catch { 
            toast.error("Algo deu errado-form-capítulos");
        } finally { 
            setIsUpdating(false);
        }
    }
    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Capítulos do curso
                <Button onClick={toggleCreating} variant="ghost">
                    {isCreating ? (
                        <>Cancelar</>
                    ) : (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Adicionar capítulo
                        </>
                    )}
                </Button>
            </div>
            {isCreating && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-4"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="por exemplo, 'Introdução do curso'"
                                            {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            disabled={!isValid || isSubmitting}
                            type="submit"
                        >
                          Criar
                        </Button>
                    </form>
                </Form>
            )}
            {!isCreating && (
                <div className={cn(
                    "text-sm mt-2",
                    !initialData.chapters.length && "text-slate-500 italic"
                )}>
                   {!initialData.chapters.length && "Não tem capítulos"}
                   <ChaptersList 
                    onEdit={() => {}}
                    onReorder={onReorder}
                    items={initialData.chapters || []}
                   />
                </div>
            )}
            {!isCreating && (
                <div className="text-xl text-muted-foreground mt-4">
                    Arraste e solte para reordenar os capítulos
                </div>
            )}
        </div>
    )
} 