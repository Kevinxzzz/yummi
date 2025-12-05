import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HeaderProfilePage = () => {
  return (
    <>
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md ">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5 text-orange-600" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Configurações</h1>
        </div>
      </header>
    </>
  );
};
