import { useState } from "react";
import ReactPlayer from 'react-player'
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";



export const ExternalVideoSearch = ({}) => {
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

  return (
    <div>
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
              <ReactPlayer url={searchedVideoUrl} controls />
            </div>
        </div>
      )}
    </div>
  );
};


