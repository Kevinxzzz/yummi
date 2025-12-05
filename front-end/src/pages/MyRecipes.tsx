import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { SideBar } from "@/components/SideBar";
import { SearchBar } from "@/components/SearchBar";
import { FilterBar } from "@/components/FilterBar";
import { RecipeSkeleton } from "@/components/RecipeSkeleton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash } from "lucide-react";
import type { Recipe, RecipeType, RecipePayload } from "@/types/recipe";
import { MyRecipeCard } from "@/components/MyRecipesPage/MyRecipeCard";
import {
  putRecipe,
  getRecipesUser,
  postRecipe,
  deleteRecipe,
} from "@/service/recipeService";

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

  const [formData, setFormData] = useState<RecipePayload>({
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
  });

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

    // Normalizar ingredientes para texto
    const normalizedIngredients = recipe.ingredients
      .map((i) => (typeof i === "string" ? i : Object.values(i).join(" ")))
      .join(", ");

    const normalizedPrep = recipe.preparationMethods
      .map((p) => (typeof p === "string" ? p : Object.values(p).join(" ")))
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

      ingredients: recipe.ingredients.map((i) =>
        typeof i === "string" ? i : Object.values(i).join(" ")
      ),

      preparationMethods: recipe.preparationMethods.map((p) =>
        typeof p === "string" ? p : Object.values(p).join(" ")
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

      window.location.reload();
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
    window.location.reload();
    setDialogOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-secondary/20">
      <Header open={open} setOpen={setOpen} />
      <SideBar open={open} setOpen={setOpen} />

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

          {/* Count */}
          <div className="text-sm text-muted-foreground">
            {filteredRecipes.length}{" "}
            {filteredRecipes.length === 1
              ? "receita encontrada"
              : "receitas encontradas"}
          </div>

          {/* Grid */}
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

      {/* DIALOG */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="rounded-2xl bg-card">
          <DialogHeader>
            <DialogTitle>
              {editingRecipe ? "Editar Receita" : "Nova Receita"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
            <div>
              <Label>Título</Label>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Descrição</Label>
              <Textarea
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Categoria</Label>
              <Select
                value={formData.type}
                onValueChange={(value) =>
                  setFormData({ ...formData, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>

                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>URL da Imagem</Label>
              <Input
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Tempo de Preparo</Label>
              <Input
                value={formData.prepTime}
                onChange={(e) =>
                  setFormData({ ...formData, prepTime: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Porções</Label>
              <Input
                type="number"
                min={1}
                value={formData.servings}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    servings: Number(e.target.value),
                  })
                }
              />
            </div>

            <div>
              <Label>Dificuldade</Label>
              <Select
                value={formData.difficulty}
                onValueChange={(value) =>
                  setFormData({ ...formData, difficulty: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a dificuldade" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="fácil">Fácil</SelectItem>
                  <SelectItem value="médio">Médio</SelectItem>
                  <SelectItem value="difícil">Difícil</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Ingredientes (divida os ingredientes por virgula)</Label>
              <Textarea
                rows={3}
                value={ingredientsText}
                onChange={(e) => setIngredientsText(e.target.value)}
                onBlur={() =>
                  setFormData({
                    ...formData,
                    ingredients: ingredientsText
                      .split(",")
                      .map((i) => i.trim())
                      .filter(Boolean),
                  })
                }
              />
            </div>

            <div>
              <Label>Modo de Preparo (divida os passos por virgula)</Label>
              <Textarea
                rows={4}
                value={prepText}
                onChange={(e) => setPrepText(e.target.value)}
                onBlur={() =>
                  setFormData({
                    ...formData,
                    preparationMethods: prepText
                      .split(",")
                      .map((i) => i.trim())
                      .filter(Boolean),
                  })
                }
              />
            </div>
          </div>

          <DialogFooter>
            <div className="flex w-full justify-center gap-4">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancelar
              </Button>

              <Button disabled={!formData.title.trim()} onClick={handleSave}>
                {editingRecipe ? "Salvar" : "Criar"}
              </Button>
              {editingRecipe && (
                <Button
                  variant="destructive"
                  size="sm"
                  className="flex gap-2"
                  onClick={handleDeleteRecipe}
                >
                  <Trash className="h-4 w-4" />
                  Excluir
                </Button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyRecipes;
