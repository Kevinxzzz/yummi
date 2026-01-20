import { useState, useMemo, useEffect } from "react";
import { Header } from "@/components/Header";
import { SideBar } from "@/components/SideBar";
import type { Recipe, RecipeType, RecipePayload } from "@/types/recipe";
import {
  putRecipe,
  getRecipesUser,
  postRecipe,
  deleteRecipe,
} from "@/service/recipeService";
import { ModalMyRecipes } from "@/components/MyRecipesPage/ModalMyRecipes";
import { MainMyRecipe } from "@/components/MyRecipesPage/MainMyRecipes";
import {useNavigate} from "react-router-dom";

const categories = [
  { label: "Sobremesa", value: "sobremesa" },
  { label: "Prato Principal", value: "pratoprincipal" },
  { label: "Entrada", value: "entrada" },
  { label: "Salada", value: "salada" },
  { label: "Sopa", value: "sopa" },
  { label: "Café da Manhã", value: "cafedamanha" },
  { label: "Lanche", value: "lanche" },
  { label: "Bebida", value: "bebida" },
];

const MyRecipes = () => {
  const [open, setOpen] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<RecipeType | "all">("all");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);

  const [ingredientsText, setIngredientsText] = useState("");
  const [prepText, setPrepText] = useState("");
  const navigate = useNavigate();
  const emptyForm: RecipePayload = {
    title: "",
    description: "",
    type: "",
    imageUrl: "",
    prepTime: "",
    servings: 1,
    difficulty: "",
    ingredients: [],
    preparationMethods: [],
    userId: 0,
  };
  const [formData, setFormData] = useState<RecipePayload>(emptyForm);

  useEffect(() => {
    setIsLoading(true);

    const fetchUserRecipes = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "null");
        if (!user?.id) throw new Error("Usuário não encontrado");

        const userRecipes = await getRecipesUser(user.id);
        setRecipes(userRecipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserRecipes();
  }, []);

  const clickButtonEdit = (recipe: Recipe) => {
    setDialogOpen(true);
    setEditingRecipe(recipe);
    console.log(recipe);

    
    const normalizedIngredients = recipe.ingredients
      .flatMap((i) => (typeof i === "string" ? [i] : i.ingredients))
      .join(", ");

    const normalizedPrep = recipe.preparationMethods
      .flatMap((p) => (typeof p === "string" ? [p] : p.steps))
      .join(", ");

    setIngredientsText(normalizedIngredients);
    setPrepText(normalizedPrep);

    setFormData({
      title: recipe.title,
      description: recipe.description,
      type: recipe.type,
      imageUrl: recipe.imageUrl,
      prepTime: recipe.prepTime,
      servings: recipe.servings,
      difficulty: recipe.difficulty,
      userId: recipe.userId,

      ingredients: recipe.ingredients.flatMap((i) =>
        typeof i === "string" ? [i] : i.ingredients,
      ),

      preparationMethods: recipe.preparationMethods.flatMap((p) =>
        typeof p === "string" ? [p] : p.steps,
      ),
    });
  };

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

  const handleSave = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "null");
      if (!user?.id) throw new Error("Usuário não encontrado");

      const payload = { ...formData, userId: user.id };

      if (editingRecipe) {
        await putRecipe(editingRecipe.id, payload);
      } else {
        await postRecipe(payload);
      }

      navigate("/myRecipes");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateNew = () => {
    setEditingRecipe(null);
    setFormData({ ...emptyForm });
    setIngredientsText("");
    setPrepText("");
    setDialogOpen(true);
  };

  const handleDeleteRecipe = async () => {
    console.log("recipe id:", editingRecipe.id);
    await deleteRecipe(editingRecipe.id);
    navigate("/myRecipes");
    setDialogOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-secondary/20">
      <Header open={open} setOpen={setOpen} />
      <SideBar open={open} setOpen={setOpen} />

      <MainMyRecipe
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleCreateNew={handleCreateNew}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        filteredRecipes={filteredRecipes}
        isLoading={isLoading}
        clickButtonEdit={clickButtonEdit}
      />

      <ModalMyRecipes
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        editingRecipe={editingRecipe}
        formData={formData}
        setFormData={setFormData}
        categories={categories}
        ingredientsText={ingredientsText}
        setIngredientsText={setIngredientsText}
        prepText={prepText}
        setPrepText={setPrepText}
        handleSave={handleSave}
        handleDeleteRecipe={handleDeleteRecipe}
      />
    </div>
  );
};

export default MyRecipes;
