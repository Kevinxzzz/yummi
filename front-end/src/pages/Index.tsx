import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchBar } from "@/components/SearchBar";
import { RecipeType } from "@/types/recipe";
import { getRecipes } from "@/service/recipeService";
import type { Recipe } from "@/types/recipe";
import { SideBar } from "@/components/SideBar";
import { TitleHomePage } from "@/components/HomePage/TitleHomePage";
import { MainHomePage } from "@/components/HomePage/MainHomePage";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<RecipeType | "all">("all");
  const [isLoading, setIsLoading] = useState(true);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setIsLoading(true);
        const data = await getRecipes();
        setRecipes(data ?? []);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesSearch =
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType =
        selectedType === "all" || recipe.type === selectedType;

      return matchesSearch && matchesType;
    });
  }, [recipes, searchQuery, selectedType]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header open={open} setOpen={setOpen} />

      <SideBar open={open} setOpen={setOpen} />

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-24 pb-12 px-4 bg-gradient-to-b from-primary/5 to-background"
      >
        <div className="container mx-auto text-center space-y-6">
          <TitleHomePage />

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center"
          >
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </motion.div>
        </div>
      </motion.section>

      <MainHomePage
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        filteredRecipes={filteredRecipes}
        isLoading={isLoading}
      />

      <Footer />
    </div>
  );
};

export default Index;
