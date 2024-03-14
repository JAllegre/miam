import { Paths } from "@/lib/constants";
import { getLabelFromRecipeKind } from "@/lib/tools";
import { GetRecipeResponse } from "@common/types";
import { Link, useLoaderData, useParams } from "react-router-dom";
// import { Button } from "./ui/button";

// Display a line of text
function Line({ text }: { text: string }) {
  return <li className="pl-2">{text}</li>;
}

export default function RecipePage() {
  const { recipe } = useLoaderData() as GetRecipeResponse;
  const { recipeId } = useParams();
  const { name, ingredients, steps, peopleNumber, imageDataUrl, kind } =
    recipe || {};

  return (
    <main className="p-1">
      <div className="flex justify-between">
        <div className="text-xl font-medium">
          {name} [{getLabelFromRecipeKind(kind)}]
        </div>
        {/* <Button color="warning" size="sm"> */}
        <Link
          to={`${Paths.Recipes}/${recipeId}/update`}
          className="text-[20px]"
        >
          {/* <MdEdit /> */}
          {"!"}
        </Link>
        {/* </Button> */}
      </div>

      <div className="flex flex-col-reverse md:flex-row  justify-between gap-2 pt-2">
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
          <img
            src={imageDataUrl}
            className="w-[150px] h-[150px] md:w-[250px] md:h-[250px] md:self-auto self-center"
            alt="recipe"
          />
        )}
      </div>

      <div className="text-md font-medium pt-4">Préparation</div>
      <ul>
        {steps?.split(/\r?\n/).map((step, i) => (
          <Line key={`${step}-${i}`} text={step} />
        ))}
      </ul>
    </main>
  );
}
