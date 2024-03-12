import { RecipeKind } from "../types";

export function getLabelFromRecipeKind(kind?: RecipeKind): string {
  switch (kind) {
    case RecipeKind.Appetizer:
      return "Entrée";
    case RecipeKind.Course:
      return "Plat";
    case RecipeKind.Dessert:
      return "Dessert";
    case RecipeKind.Drink:
      return "Boisson";
    default:
      return "???";
  }
}
