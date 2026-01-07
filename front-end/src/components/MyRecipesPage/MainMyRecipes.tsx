import { motion } from "framer-motion";
import { SearchBar } from "@/components/SearchBar";
import { FilterBar } from "@/components/FilterBar";
import { RecipeSkeleton } from "@/components/RecipeSkeleton";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { MyRecipeCard } from "@/components/MyRecipesPage/MyRecipeCard";
import type { RecipePayload } from "@/types/recipe";

interface MainMyRecipeProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
    handleCreateNew: () => void;
    selectedType: string;
    setSelectedType: (type: string) => void;
    filteredRecipes: RecipePayload[];
    isLoading: boolean;
    clickButtonEdit: (recipeId: number) => void;
}

export const MainMyRecipe = ({
  searchQuery,
  setSearchQuery,
  handleCreateNew,
  selectedType,
  setSelectedType,
  filteredRecipes,
  isLoading,
  clickButtonEdit,
}) => {
  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-24 pb-12 px-4"
      >
        <div className="container mx-auto space-y-6">
          <div className="flex flex-col items-center text-center space-y-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                Minhas <span className="text-primary">Receitas</span>
              </h2>
              <p className="text-muted-foreground">
                Gerencie suas receitas favoritas
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />

              <Button
                size="lg"
                className="gap-2 bg-primary/70 hover:bg-primary text-primary-foreground"
                onClick={handleCreateNew}
              >
                <Plus className="h-5 w-5" />
                Nova Receita
              </Button>
            </div>
          </div>

          <FilterBar
            selectedType={selectedType}
            onTypeChange={setSelectedType}
          />

          <div className="text-sm text-muted-foreground">
            {filteredRecipes.length}{" "}
            {filteredRecipes.length === 1
              ? "receita encontrada"
              : "receitas encontradas"}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(6)].map((_, i) => (
                <RecipeSkeleton key={i} />
              ))}
            </div>
          ) : filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredRecipes.map((recipe, index) => (
                <MyRecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  index={index}
                  clickButtonEdit={clickButtonEdit}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 space-y-4">
              <p className="text-2xl font-semibold text-muted-foreground">
                Nenhuma receita encontrada
              </p>
              <p className="text-muted-foreground">
                Tente ajustar sua busca ou filtros
              </p>
            </div>
          )}
        </div>
      </motion.section>
    </>
  );
};
