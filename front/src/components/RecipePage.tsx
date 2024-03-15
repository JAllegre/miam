import { Paths } from "@/lib/constants";
import { GetRecipeResponse } from "@common/types";
import { Pencil } from "lucide-react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { Button } from "./ui/button";

// Display a line of text
function Line({ text }: { text: string }) {
  return <li className="pl-2">{text}</li>;
}

export default function RecipePage() {
  const { recipe } = useLoaderData() as GetRecipeResponse;
  const { recipeId } = useParams();
  const { name, ingredients, steps, peopleNumber, imageDataUrl } = recipe || {};

  return (
    <main className="px-1 py-3">
      <div className="flex justify-between">
        <div className="text-2xl font-medium">{name}</div>
        <Button size="icon">
          <Link
            to={`${Paths.Recipes}/${recipeId}/update`}
            className="text-[20px] p-5"
          >
            <Pencil />
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-col  justify-between gap-2 pt-2">
        <div className="flex flex-row justify-between">
          <div>
            <div className="text-md font-medium">
              Ingrédients
              {!!peopleNumber && <span>(pour {peopleNumber} personnes)</span>}
            </div>
            <ul>
              {ingredients?.split(/\r?\n/).map((ingredient, i) => (
                <Line key={`${ingredient}-${i}`} text={ingredient} />
              ))}
            </ul>
          </div>

          {imageDataUrl && (
            <div className="basis-1/2">
              <img
                src={imageDataUrl}
                alt="recipe"
                className="rounded-md shadow-md"
              />
            </div>
          )}
        </div>
        <div>
          <div className="text-md font-medium pt-4">Préparation</div>
          <ul>
            {steps?.split(/\r?\n/).map((step, i) => (
              <Line key={`${step}-${i}`} text={step} />
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
