import { Clock, Users, Star, ChefHat } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { Recipe } from "@/types/recipe";

interface HeaderCardProps {
  recipe: Recipe;
  averageRating: number;
}

export const HeaderCard = ({ recipe, averageRating }: HeaderCardProps) => {
  return (
    <>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-primary text-primary-foreground">
            {recipe.type || "indefinido"}
          </Badge>
          <Badge variant="outline">{recipe.difficulty || "Indefinido"}</Badge>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          {recipe.title}
        </h1>

        <p className="text-lg text-muted-foreground">{recipe.description}</p>

        <div className="flex flex-wrap gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            <span className="font-medium">{recipe.prepTime} minutos</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            <span className="font-medium">{recipe.servings} porções</span>
          </div>
          <div className="flex items-center gap-2">
            <ChefHat className="w-5 h-5 text-primary" />
            <span className="font-medium">
              {recipe.difficulty || "indefinido"}
            </span>
          </div>
          {recipe.reviews.length > 0 && (
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">
                {averageRating.toFixed(1)} ({recipe.reviews.length} avaliações)
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
