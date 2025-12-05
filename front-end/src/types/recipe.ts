export interface Recipe {
  id: number;
  title: string;
  description: string;
  type: string;
  imageUrl?: string;
  prepTime?: string;
  servings?: number;
  difficulty?: string;
  createdAt: string;
  updatedAt: string;
  userId: number;

  ingredients: Ingredient[];
  preparationMethods: PreparationMethod[];
  reviews: Reviews[];
}

export interface Ingredient {
    id: number;
    ingredients: string[];
    recipeId: number;
}

export interface PreparationMethod {
    id: number;
    steps: string[];
    recipeId: number;
}

export interface Reviews {
    id: number;
    rating: number;
    comment: string;
    userId: number;
    recipeId: number;
    createdAt: string;
}

export type RecipeType =
  | 'sobremesa'
  | 'pratoprincipal'
  | 'entrada'
  | 'salada'
  | 'sopa'
  | 'cafedamanha'
  | 'lanche'
  | 'bebida';

export const recipeTypeLabels: Record<RecipeType, string> = {
  sobremesa: 'Sobremesa',
  pratoprincipal: 'Prato Principal',
  entrada: 'Entrada',
  salada: 'Salada',
  sopa: 'Sopa',
  cafedamanha: 'Café da Manhã',
  lanche: 'Lanche',
  bebida: 'Bebida',
};

export interface CreateRecipe {
  title: string;
  description: string;
  type: string;
  imageUrl?: string;
  prepTime?: string;
  servings?: number;
  difficulty?: string;
  userId: number;
}

export interface RecipePayload {
  userId: number;
  title: string;
  description: string;
  type: string;
  imageUrl: string;
  prepTime: string;
  servings: number;
  difficulty: string;
  ingredients: string[];
  preparationMethods: string[];
}
