import { ReactNode, useContext, useState } from "react";
// import { FaGlassMartiniAlt } from "react-icons/fa";
// import { GiMeat } from "react-icons/gi";
// import { RiCake3Line } from "react-icons/ri";
// import { getAllRecipes } from "../db";

import { Link, useLoaderData } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { SearchContext } from "../contexts/SearchContext";
import { Paths } from "../lib/constants";
import { GetRecipesResponse, RecipeKind } from "../types";

// flat a string by removing accents and diacritics in order to make hl comparaison
function flatString(s?: string): string {
  if (!s) {
    return "";
  }
  return s
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

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
          if (
            searchText &&
            !flatString(recipe.name).includes(
              flatString(searchText).toLocaleLowerCase()
            )
          ) {
            return acc;
          }
          return [
            ...acc,
            <li key={recipe.name} className="p-1 hover:bg-gray-100">
              <Link to={`${Paths.Recipes}/${recipe.id}`}>
                <div className="flex items-center justify-start gap-2">
                  {recipe.kind === RecipeKind.Course && (
                    <Badge color="pink" className="p-[4px] text-md">
                      {/* <GiMeat /> */}P
                    </Badge>
                  )}

                  {recipe.kind === RecipeKind.Dessert && (
                    <Badge color="success" className="p-[4px] text-md">
                      {/* <RiCake3Line /> */}D
                    </Badge>
                  )}

                  {recipe.kind === RecipeKind.Drink && (
                    <Badge color="warning" className="p-[4px] text-sm">
                      {/* <FaGlassMartiniAlt /> */}A
                    </Badge>
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
