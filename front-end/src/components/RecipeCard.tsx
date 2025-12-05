import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, Star, Users } from "lucide-react";
import { Recipe, recipeTypeLabels } from "@/types/recipe";
import { Badge } from "@/components/ui/badge";

interface RecipeCardProps {
  recipe: Recipe;
  index: number;
}

export const RecipeCard = ({ recipe, index }: RecipeCardProps) => {
  const averageRating =
    recipe.reviews.length > 0
      ? recipe.reviews.reduce((sum, review) => sum + review.rating, 0) /
        recipe.reviews.length
      : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <Link to={`/recipe/${recipe.id}`}>
        <div className="bg-card rounded-[1rem] overflow-hidden shadow-card hover:shadow-hover transition-smooth">
          {/* Image */}
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

          {/* Content */}
          <div className="p-5 space-y-3">
            {/* Title */}
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-smooth line-clamp-2">
              {recipe.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-muted-foreground line-clamp-2">
              {recipe.description}
            </p>

            {/* Meta Info */}
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

              {recipe.reviews.length > 0 && (
                <div className="flex items-center gap-1 text-sm font-medium">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{averageRating.toFixed(1)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
