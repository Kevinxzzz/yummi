import { Recipe, RecipeType } from "@/types/recipe";
import { FilterBar } from "../FilterBar";
import { RecipeGrid } from "../RecipeGrid";
import { motion } from "framer-motion";

interface MainHomePageProps {
  selectedType: RecipeType | "all";
  setSelectedType: React.Dispatch<React.SetStateAction<RecipeType | "all">>;
  filteredRecipes: Recipe[];
  isLoading: boolean;
}

export const MainHomePage = ({
  selectedType,
  setSelectedType,
  filteredRecipes,
  isLoading,
}: MainHomePageProps) => {
  return (
    <>
      <main className="flex-1 container mx-auto px-4 space-y-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <FilterBar
            selectedType={selectedType}
            onTypeChange={setSelectedType}
          />
        </motion.div>

        <RecipeGrid filteredRecipes={filteredRecipes} isLoading={isLoading} />
      </main>
    </>
  );
};
