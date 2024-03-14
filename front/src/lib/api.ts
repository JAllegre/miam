import { RECIPES_API } from "@common/constants";
import {
  GetRecipeResponse,
  GetRecipesResponse,
  RecipeInput,
} from "@common/types";

const baseApiUrl = `${import.meta.env.VITE_API_HOST}${RECIPES_API}`;

async function postData<T>(url: string, data: T) {
  const response = await fetch(url, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

async function putData<T>(url: string, data: T) {
  const response = await fetch(url, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

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

export async function updateOneRecipe(
  recipeId: number,
  recipeInput: RecipeInput
): Promise<GetRecipeResponse> {
  const response = await putData(`${baseApiUrl}/${recipeId}`, recipeInput);
  return response.json();
}

export async function addOneRecipe(
  recipeInput: RecipeInput
): Promise<GetRecipeResponse> {
  const response = await postData(`${baseApiUrl}`, recipeInput);
  return response.json();
}

export async function checkPassword(password: string): Promise<boolean> {
  const response = await postData(`${baseApiUrl}/check`, { password });
  return true;
}
