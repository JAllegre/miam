import { GetRecipeResponse, GetRecipesResponse } from "@/types";
const miamRecipesApiPrefix = "/api/miam/recipes";

const baseApiUrl = `${import.meta.env.VITE_API_HOST}${miamRecipesApiPrefix}`;

export async function getAllRecipes(): Promise<GetRecipesResponse> {
  try {
    const response = await fetch(baseApiUrl);
    return response.json();
  } catch (error) {
    console.error("api.ts/FUNC | getAllRecipes | error", error);
  }
  return { numRows: 0, recipes: [] };
}

export async function getOneRecipe(
  recipeId: number
): Promise<GetRecipeResponse> {
  const response = await fetch(`${baseApiUrl}/${recipeId}`);
  return response.json();
}
