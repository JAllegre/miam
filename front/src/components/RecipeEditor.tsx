import convertFileToImageDataUrl from "@/lib/convertFileToImageDataUrl";
import { getLabelFromRecipeKind } from "@/lib/tools";
import { RecipeInput, RecipeKind, RecipeRow } from "@common/types";
import { ChangeEvent, useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paths } from "../lib/constants";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

function buildRecipeInput(formData: FormData): RecipeInput {
  const peopleNumberStr = formData.get("peopleNumber")?.toString() || "";
  const idStr = formData.get("recipeId")?.toString() || "";
  return {
    name: formData.get("name")?.toString() || "",
    kind: parseInt(
      formData.get("kind")?.toString() || String(RecipeKind.Course)
    ),
    peopleNumber: peopleNumberStr ? parseInt(peopleNumberStr) : undefined,
    ingredients: formData.get("ingredients")?.toString() || "",
    steps: formData.get("steps")?.toString() || "",
    imageDataUrl: formData.get("imageDataUrl")?.toString() || "",
    ...(idStr && { id: parseInt(idStr) }),
  };
}
interface RecipeEditorProps {
  recipe?: RecipeRow;
}

export default function RecipeEditor({ recipe }: RecipeEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newImageDataUrl, setNewImageDataUrl] = useState<string>("");
  const [currentKind, setCurrentKind] = useState<RecipeKind>(RecipeKind.Course);
  const navigate = useNavigate();

  const handleFileChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const imageDataUrl = await convertFileToImageDataUrl(e.target.files?.[0]);
      setNewImageDataUrl(imageDataUrl);
    },
    []
  );

  const handleSelectKindChange = useCallback((kind: string) => {
    setCurrentKind(parseInt(kind, 10));
  }, []);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    formData.set("kind", String(currentKind) || String(RecipeKind.Course));

    console.log(
      "RecipeEditor.tsx/FUNC | buildRecipeInput(formData)",
      buildRecipeInput(formData)
    );
    if (recipe) {
      formData.set("recipeId", String(recipe.id));
      //await updateOneRecipe(recipe.id, buildRecipeInput(formData));
      navigate(`${Paths.Recipes}/${recipe.id}`);
    } else {
      //await addOneRecipe(buildRecipeInput(formData));
      navigate(Paths.Recipes);
    }
  };

  const handleDeleteImageClick = useCallback(() => {
    setNewImageDataUrl("");
    if (fileInputRef?.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const handleResetClick = useCallback(() => {
    setNewImageDataUrl("");
    if (recipe) {
      navigate(`${Paths.Recipes}/${recipe.id}`);
    } else {
      navigate(Paths.Recipes);
    }
  }, [recipe, navigate]);

  return (
    <main className="py-3">
      <form onSubmit={handleFormSubmit} action="">
        <input type="hidden" id="recipeId" name="recipeId" value={recipe?.id} />
        <div className="flex items-center gap-2 py-2">
          <Label htmlFor="name" className="font-bold w-1/4">
            Nom de la recette:
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            minLength={5}
            maxLength={50}
            placeholder=""
            spellCheck={true}
            required
            defaultValue={recipe?.name}
            className="w-3/4"
          />
        </div>
        <div className="flex items-center gap-2 py-2">
          <Select
            onValueChange={handleSelectKindChange}
            value={String(currentKind)}
          >
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Choisissez un type de plat" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Object.values(RecipeKind)
                  .filter((kind) => !isNaN(Number(kind)))
                  .map((kind) => (
                    <SelectItem key={String(kind)} value={String(kind)}>
                      {getLabelFromRecipeKind(kind as RecipeKind)}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2 py-2">
          <Label htmlFor="peopleNumber" className="font-bold w-1/4">
            Nombre de personne:
          </Label>
          <Input
            id="peopleNumber"
            name="peopleNumber"
            type="number"
            min={0}
            max={15}
            placeholder=""
            defaultValue={recipe?.peopleNumber}
            className="w-3/4"
          />
        </div>

        <div className="py-2">
          <Label htmlFor="ingredients" className="font-bold">
            Ingrédients:
          </Label>
          <Textarea
            id="ingredients"
            name="ingredients"
            rows={10}
            minLength={30}
            placeholder=""
            spellCheck={true}
            required
            defaultValue={recipe?.ingredients}
          ></Textarea>
        </div>
        <div className="py-2">
          <Label htmlFor="steps" className="font-bold">
            Préparation:
          </Label>
          <Textarea
            id="steps"
            name="steps"
            rows={10}
            minLength={30}
            placeholder=""
            spellCheck={true}
            required
            defaultValue={recipe?.steps}
          ></Textarea>
        </div>

        <Label htmlFor="imgFile" className="pt-2 font-bold">
          Image:
        </Label>
        <div className="flex gap-3">
          {newImageDataUrl && (
            <img
              src={newImageDataUrl}
              alt="recipe"
              className="w-[150px] h-[150px]"
            />
          )}

          <div className="flex flex-col gap-2 items-start">
            <Input
              type="file"
              ref={fileInputRef}
              id="imgFile"
              name="imgFile"
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
            />
            {newImageDataUrl && (
              <Button
                type="button"
                color="warning"
                onClick={handleDeleteImageClick}
              >
                {"DEL"}
              </Button>
            )}
          </div>

          <input
            type="hidden"
            id="imageDataUrl"
            name="imageDataUrl"
            defaultValue={newImageDataUrl}
          />
        </div>

        <div className="flex gap-4 pt-5">
          <Button type="submit" color="success">
            {recipe ? "Appliquer les modifications" : "Ajouter la recette"}
          </Button>
          <Button type="reset" color="failure" onClick={handleResetClick}>
            Annuler
          </Button>
        </div>
      </form>
    </main>
  );
}
