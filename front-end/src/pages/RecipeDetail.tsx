import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import type { Recipe } from "@/types/recipe";
import { getRecipes } from "@/service/recipeService";
import { useState, useEffect } from "react";
import { MainRecipeDetailPage } from "@/components/RecipeDetailPage/MainRecipeDetailPage";

const RecipeDetail = () => {
  const [recipesData, setRecipesData] = useState<Recipe[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getRecipes();
        console.log("detail:", data);
        setRecipesData(data ?? []);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  const { id } = useParams();
  const recipe = recipesData.find((r) => r.id === Number(id));

  if (!recipe) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header open={open} setOpen={setOpen} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <p className="text-2xl font-semibold text-muted-foreground">
              Receita não encontrada
            </p>
            <Link to="/">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar para receitas
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const averageRating =
    recipe.reviews.length > 0
      ? recipe.reviews.reduce((sum, review) => sum + review.rating, 0) /
        recipe.reviews.length
      : 0;
  console.log("Rendering RecipeDetail for recipe:", recipe);
  return (
    <div className="min-h-screen flex flex-col">
      <Header open={open} setOpen={setOpen} />

      <MainRecipeDetailPage
        recipe={recipe}
        averageRating={averageRating}
        open={open}
        setOpen={setOpen}
      />

      <Footer />
    </div>
  );
};

export default RecipeDetail;
