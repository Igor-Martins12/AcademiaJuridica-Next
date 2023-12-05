"use client";

import { useState } from "react";
import ReactPlayer from 'react-player';
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import { Chapter,  Video } from "@prisma/client";


interface ChapterVideoFormProps {
  initialData: Chapter & { video?: Video| null};
  courseId: string;
  chapterId: string;
};

export const ExternalVideoSearch = ({
  initialData,
  courseId,
  chapterId
}:ChapterVideoFormProps) => {
  const [externalVideoUrl, setExternalVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchedVideoUrl, setSearchedVideoUrl] = useState<string | null>(null);

  const searchExternalVideo = async () => {
    try {
      if (!ReactPlayer.canPlay(externalVideoUrl)) {
        toast.error("URL inválida. Por favor, insira uma URL de vídeo válida.");
        return;
      }
      setSearchedVideoUrl(externalVideoUrl);
      setLoading(true);
    } catch (error) {
      toast.error("Erro ao pesquisar o vídeo externo");
    } finally {
      setLoading(false);
    }
  };

  const saveVideoToApi = async () => {
    try {
      console.log("Valor de searchedVideoUrl:", searchedVideoUrl);
      // Faz uma solicitação para a API para salvar a URL do vídeo
      await axios.patch("/api/saveVideo", searchedVideoUrl);
      toast.success("Vídeo salvo com sucesso!");
    } catch (error) {
      toast.error("Erro ao salvar o vídeo na API");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <input
        type="text"
        placeholder="URL do vídeo externo"
        className="border p-2 w-full mt-2"
        value={externalVideoUrl}
        onChange={(e) => setExternalVideoUrl(e.target.value)}
      />
      <Button onClick={searchExternalVideo} className="btn mt-2">
        Pesquisar Vídeo
      </Button>
      {loading && <p>Procurando vídeo...</p>}
      {searchedVideoUrl && (
        <div className="flex items-center justify-center">
          <div className="relative aspect-video mt-2">
            <ReactPlayer url={searchedVideoUrl} controls width="100%" height="100%" />
          </div>
        </div>
      )}
      {searchedVideoUrl && (
        <Button onClick={saveVideoToApi} className="btn mt-2">
          Salvar Vídeo 
        </Button>
      )}
    </div>
  );
};



