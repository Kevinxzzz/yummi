import { RecipeSkeleton } from "./RecipeSkeleton";
import { RecipeCard } from "./RecipeCard";
import type { Recipe } from "@/types/recipe";
import { motion } from "framer-motion";

interface RecipeGridProps {
  filteredRecipes: Recipe[];
  isLoading: boolean;
}

export const RecipeGrid = ({ filteredRecipes, isLoading }: RecipeGridProps) => {
  return (
    <>
      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        {filteredRecipes.length}{" "}
        {filteredRecipes.length === 1
          ? "receita encontrada"
          : "receitas encontradas"}
      </div>

      {/* Recipe Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <RecipeSkeleton key={i} />
          ))}
        </div>
      ) : filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRecipes.map((recipe, index) => (
            <RecipeCard key={recipe.id} recipe={recipe} index={index} />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 space-y-4"
        >
          <p className="text-2xl font-semibold text-muted-foreground">
            Nenhuma receita encontrada
          </p>
          <p className="text-muted-foreground">
            Tente ajustar seus filtros ou busca
          </p>
        </motion.div>
      )}
    </>
  );
};
