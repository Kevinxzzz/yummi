import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Users, Star, ChefHat } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Recipe } from "@/types/recipe";
import { getRecipes } from "@/service/recipeService";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SideBar } from "@/components/SideBar";

const RecipeDetail = () => {
  const navigate = useNavigate();
  const [recipesData, setRecipesData] = useState<Recipe[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const goBack = () => {
    navigate(-1);
  };
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
  return (
    <div className="min-h-screen flex flex-col">
      <Header open={open} setOpen={setOpen} />

      <main className="flex-1 pt-20">
        <SideBar open={open} setOpen={setOpen} />
        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative h-[50vh] min-h-[400px]"
        >
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </motion.div>

        <div className="container mx-auto px-4 -mt-32 relative z-10">
          {/* Back Button */}
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

          {/* Content Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-[1rem] shadow-card p-8 space-y-8"
          >
            {/* Header */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-primary text-primary-foreground">
                  {recipe.type || "indefinido"}
                </Badge>
                <Badge variant="outline">
                  {recipe.difficulty || "Indefinido"}
                </Badge>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {recipe.title}
              </h1>

              <p className="text-lg text-muted-foreground">
                {recipe.description}
              </p>

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
                      {averageRating.toFixed(1)} ({recipe.reviews.length}{" "}
                      avaliações)
                    </span>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Ingredients */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">
                Ingredientes
              </h2>

              <ul className="space-y-3">
                {recipe.ingredients[0].ingredients.map((text, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-start gap-3 text-foreground"
                  >
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span>{text}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <Separator />

            {/* Preparation Method */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">
                Modo de Preparo
              </h2>

              <ol className="space-y-4">
                {recipe.preparationMethods[0].steps.map((text, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex gap-4"
                  >
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </span>

                    <p className="text-foreground pt-1">{text}</p>
                  </motion.li>
                ))}
              </ol>
            </div>

            {/* Reviews */}
            {recipe.reviews.length > 0 && (
              <>
                <Separator />
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-foreground">
                    Avaliações
                  </h2>
                  <div className="space-y-4">
                    {recipe.reviews.map((review) => (
                      <motion.div
                        key={review.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-muted/30 rounded-lg p-4 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-foreground">
                            {/* {review.userName} */}
                          </span>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-muted-foreground">
                          {review.comment}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(review.createdAt).toLocaleDateString(
                            "pt-BR"
                          )}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>

        <div className="h-16" />
      </main>

      <Footer />
    </div>
  );
};

export default RecipeDetail;
