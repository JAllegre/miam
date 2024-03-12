import { GetRecipeResponse, GetRecipesResponse } from "@/types";

export async function getAllRecipes(): Promise<GetRecipesResponse> {
  const response = await fetch("http://localhost:3000/miam/recipes");
  return response.json();
}

export async function getOneRecipe(
  recipeId: number
): Promise<GetRecipeResponse> {
  const response = await fetch(
    `http://localhost:3000/miam/recipes/${recipeId}`
  );
  return response.json();
}
