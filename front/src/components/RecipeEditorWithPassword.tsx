import { useState } from "react";

import { checkPassword } from "@/lib/api";
import RecipeEditor from "./RecipeEditor";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface RecipeEditorWithPasswordProps {
  recipeId?: number;
}
export default function RecipeEditorWithPassword({
  recipeId,
}: RecipeEditorWithPasswordProps) {
  const [isIdentified, setIsIdentified] = useState(false);
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

  const handleIdentify = () => {
    checkPassword(password).then((isPasswordCorrect) => {
      if (isPasswordCorrect) {
        setIsIdentified(true);
        setIsError(false);
      } else {
        setIsError(true);
      }
    });

    setPassword("");
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  if (!isIdentified) {
    return (
      <div className="flex flex-col gap-1 items-center">
        <div className="flex gap-2 pt-6 justify-center">
          <Input
            placeholder="Mot de passe"
            value={password}
            onChange={handlePasswordInput}
          />

          <Button color="success" onClick={handleIdentify}>
            {"S'identifier"}
          </Button>
        </div>
        {isError && <div className="text-red-500">Mot de passe incorrect</div>}
      </div>
    );
  }

  return <RecipeEditor recipeId={recipeId} />;
}
