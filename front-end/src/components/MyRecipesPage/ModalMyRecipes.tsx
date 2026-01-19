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
import { Trash } from "lucide-react";


export const ModalMyRecipes = ({
    dialogOpen,
    setDialogOpen,
    editingRecipe,
    formData,
    setFormData,
    categories,
    ingredientsText,
    setIngredientsText,
    prepText,
    setPrepText,
    handleSave,
    handleDeleteRecipe}
) => {
  return (
    <>
       
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="rounded-2xl bg-card">
          <DialogHeader>
            <DialogTitle>
              {editingRecipe ? "Editar Receita" : "Nova Receita"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto pr-2 px-2">
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
    </>
  )
}