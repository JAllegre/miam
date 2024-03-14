import { useState } from "react";

import { checkPassword } from "@/lib/api";
import { RecipeRow } from "@common/types";
import { useLoaderData } from "react-router-dom";
import RecipeEditor from "./RecipeEditor";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function RecipeEditorWithPassword() {
  const [isIdentified, setIsIdentified] = useState(false);
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const recipe = useLoaderData() as RecipeRow;

  const handleIdentify = () => {
    checkPassword(password).then(
      () => {
        setIsIdentified(true);
        setIsError(false);
      },
      () => {
        setIsError(true);
      }
    );

    setPassword("");
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  if (!isIdentified) {
    return (
      <div className="flex flex-col gap-1 items-center p-5">
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

  return <RecipeEditor recipe={recipe} />;
}
