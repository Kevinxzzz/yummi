import axios from 'axios';
import type { Recipe,RecipePayload } from '@/types/recipe';

const API_URL = 'https://api-yummi.onrender.com/recipes/';

export const getRecipes = async () => {
    try {
        const recipes = await axios.get<Recipe[] | null>(`${API_URL}allInformations`);
        return recipes.data;
    }catch {
        throw new Error('Failed to fetch recipes');
    }
}

export const getRecipesUser = async (userId : number) => {
    try {
        const recipes = await axios.get<Recipe[] | null>(`${API_URL}allInformations/userId/${userId}`);
        return recipes.data;
    }catch {
        throw new Error('Failed to fetch recipes');
    }
}

export const postRecipe = async (data: RecipePayload) => {
  try {
    const response = await axios.post<Recipe>(`${API_URL}allInformations`, data);
    return response.data;
  } catch (error) {
    console.error("Failed to create recipe:", error);
    throw new Error("Failed to create recipe");
  }
};

export const putRecipe = async (recipeId: number, data: RecipePayload) => {
  try {
    const response = await axios.put<Recipe>(`${API_URL}allInformations/${recipeId}`, data);
    return response.data;
  } catch (error) {
    console.error("Failed to update recipe:", error);
    throw new Error("Failed to update recipe");
  }
};

export const deleteRecipe = async (recipeId: number) => {
  try {
    const response = await axios.delete(`${API_URL}${recipeId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to update recipe:", error);
    throw new Error("Failed to update recipe");
  }
};



