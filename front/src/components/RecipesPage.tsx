import { matchSearch } from "@/lib/tools";
import { CakeSlice, Soup, Wine } from "lucide-react";
import { ReactNode, useContext, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { SearchContext } from "../contexts/SearchContext";
import { Paths } from "../lib/constants";
import { GetRecipesResponse, RecipeKind } from "../types";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

export default function RecipesPage() {
  const [selectedKind, setSelectedKind] = useState(0);
  const { recipes } = useLoaderData() as GetRecipesResponse;

  const handleCheckedChange = (value: RecipeKind) => (checked: boolean) => {
    setSelectedKind(checked ? value : 0);
  };

  const { searchText } = useContext(SearchContext);
  return (
    <main className="flex-col justify-between items-center p-1 min-h-[100vh]">
      <div className="flex justify-between">
        <div className="flex justify-center items-center gap-1 focus:border-0">
          <Checkbox
            id="cb-course"
            checked={selectedKind === RecipeKind.Course}
            onCheckedChange={handleCheckedChange(RecipeKind.Course)}
            className="focus:ring-0"
          />
          <Label htmlFor="cb-course" className="mr-3">
            Plats
          </Label>

          <Checkbox
            id="cb-dessert"
            checked={selectedKind === RecipeKind.Dessert}
            onCheckedChange={handleCheckedChange(RecipeKind.Dessert)}
            className="focus:ring-0"
          />
          <Label htmlFor="cb-dessert" className="mr-3">
            Dessert
          </Label>

          <Checkbox
            id="cb-drink"
            checked={selectedKind === RecipeKind.Drink}
            onCheckedChange={handleCheckedChange(RecipeKind.Drink)}
            className="focus:ring-0"
          />
          <Label htmlFor="cb-drink" className="">
            Boisson
          </Label>
        </div>
        <Button color="warning" size="sm">
          <Link to={`${Paths.Recipes}/create`} className="text-[28px]">
            +
          </Link>
        </Button>
      </div>

      <ul className="pl-2 pt-2">
        {recipes.reduce((acc, recipe) => {
          if (selectedKind && selectedKind !== recipe.kind) {
            return acc;
          }
          if (!matchSearch(searchText, recipe.name)) {
            return acc;
          }
          return [
            ...acc,
            <li key={recipe.name} className="p-1 hover:bg-gray-100">
              <Link to={`${Paths.Recipes}/${recipe.id}`}>
                <div className="flex items-center justify-start gap-2">
                  {recipe.kind === RecipeKind.Course && (
                    <Soup
                      size={18}
                      strokeWidth={3}
                      color="purple"
                      className="mb-1"
                    />
                  )}

                  {recipe.kind === RecipeKind.Dessert && (
                    <CakeSlice
                      size={18}
                      strokeWidth={3}
                      color="orange"
                      className="mb-1"
                    />
                  )}

                  {recipe.kind === RecipeKind.Drink && (
                    <Wine
                      size={18}
                      strokeWidth={3}
                      color="green"
                      className="mb-1"
                    />
                  )}

                  <span>{recipe.name}</span>
                </div>
              </Link>
            </li>,
          ];
        }, [] as ReactNode[])}
      </ul>
    </main>
  );
}