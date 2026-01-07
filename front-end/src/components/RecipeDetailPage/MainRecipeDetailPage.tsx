import { motion } from "framer-motion";
import { ArrowLeft, Clock, Users, Star, ChefHat } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SideBar } from "@/components/SideBar";
import { Recipe } from "@/types/recipe";
import { useNavigate } from "react-router-dom";
import { BackGroudImageCard } from "./BackGroudImageCard";
import { HeaderCard } from "./HeaderCard";
import { IngredientsCard } from "./IngredientsCard";
import { PreparationMethodCard } from "./PreparationMethodCard";
import { ReviewsCard } from "./ReviewsCard";
import { Card } from "./Card";

interface MainRecipeDetailPageProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  recipe: Recipe;
  averageRating: number;
}

export const MainRecipeDetailPage = ({
  open,
  setOpen,
  recipe,
  averageRating,
}: MainRecipeDetailPageProps) => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <>
      <main className="flex-1 pt-20">
        <SideBar open={open} setOpen={setOpen} />
        <BackGroudImageCard recipe={recipe} />

        <div className="container mx-auto px-4 -mt-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <Button
              onClick={() => goBack()}
              variant="outline"
              className="bg-card/80 backdrop-blur-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </motion.div>

          <Card recipe={recipe} averageRating={averageRating} />
        </div>

        <div className="h-16" />
      </main>
    </>
  );
};
