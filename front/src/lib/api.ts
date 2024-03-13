import { GetRecipeResponse, GetRecipesResponse } from "@/types";
const miamRecipesApiPrefix = "/api/miam/recipes";

export async function getAllRecipes(): Promise<GetRecipesResponse> {
  const response = await fetch(miamRecipesApiPrefix);
  return response.json();
}

export async function getOneRecipe(
  recipeId: number
): Promise<GetRecipeResponse> {
  const response = await fetch(`${miamRecipesApiPrefix}/${recipeId}`);
  return response.json();
}
