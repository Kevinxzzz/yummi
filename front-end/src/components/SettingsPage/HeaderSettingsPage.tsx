import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
export const HeaderSettingsPage = () => {
  const Navigate = useNavigate();
  const goBack = () => {
    Navigate(-1);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md ">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            onClick={() => goBack()}
            variant="ghost"
            size="icon"
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5 text-orange-600" />
          </Button>
          <h1 className="text-xl font-bold">Configurações</h1>
        </div>
      </header>
    </>
  );
};
