import { GetRecipeResponse, GetRecipesResponse } from "@/types";

export async function getAllRecipes(): Promise<GetRecipesResponse> {
  const response = await fetch("/api/miam/recipes");
  return response.json();
}

export async function getOneRecipe(
  recipeId: number
): Promise<GetRecipeResponse> {
  const response = await fetch(`/api/miam/recipes/${recipeId}`);
  return response.json();
}
