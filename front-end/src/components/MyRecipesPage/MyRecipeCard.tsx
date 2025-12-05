import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, Pencil, Star, Trash, Users } from "lucide-react";
import { Recipe, recipeTypeLabels } from "@/types/recipe";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface RecipeCardProps {
  recipe: Recipe;
  index: number;
  clickButtonEdit: (recipe: Recipe) => void;
}

export const MyRecipeCard = ({
  recipe,
  index,
  clickButtonEdit,
}: RecipeCardProps) => {
  
  const reviewsCount = recipe.reviews?.length ?? 0;

  const averageRating =
    reviewsCount > 0
      ? recipe.reviews!.reduce((sum, review) => sum + review.rating, 0) /
        reviewsCount
      : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <div className="bg-card rounded-[1rem] overflow-hidden shadow-card hover:shadow-hover transition-smooth">
        
        {/* CARD CLICK ABRE A RECEITA */}
        <Link to={`/recipe/${recipe.id}`}>
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-smooth duration-500"
            />

            <div className="absolute top-3 right-3">
              <Badge className="bg-primary/90 backdrop-blur-sm text-primary-foreground border-0">
                {recipeTypeLabels[recipe.type] || "indefinido"}
              </Badge>
            </div>
          </div>

          <div className="p-5 space-y-3">
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-smooth line-clamp-2">
              {recipe.title}
            </h3>

            <p className="text-sm text-muted-foreground line-clamp-2">
              {recipe.description}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-border/50">
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{recipe.prepTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{recipe.servings}</span>
                </div>
              </div>

              {reviewsCount > 0 && (
                <div className="flex items-center gap-1 text-sm font-medium">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{averageRating.toFixed(1)}</span>
                </div>
              )}
            </div>
          </div>
        </Link>

        {/* BOTÃO EDITAR */}
        <div className="flex gap-2 bg-tertiary text-base">
          <Button
            variant="edit"
            size="sm"
            className="flex-1 gap-2"
            onClick={() => clickButtonEdit(recipe)}
          >
            <Pencil className="h-4 w-4" />
            Editar
          </Button>

        </div>

        

      </div>
    </motion.div>
  );
};
