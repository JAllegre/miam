import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello World" });
});

app.get("/miam/recipes", (req: Request, res: Response) => {
  res.json({
    count: 4,
    recipes: [
      { id: 1, name: "Achards de Légumes", kind: 2 },
      { id: 2, name: "Arrosto misto", kind: 2 },
      { id: 93, name: "Babas au Rhum de Vovonne ***", kind: 4 },
      { id: 3, name: "Blanquette de veau", kind: 2 },
    ],
  });
});

app.get("/miam/recipes/:id", (req: Request, res: Response) => {
  res.json({
    recipe: {
      id: 4,
      name: "Blinis",
      ingredients:
        "2 oeufs (blanc et jaune séparés)\n15cl de lait\n125g de farine\n1 càc levure chimique\n1 pincée de sel",
      steps:
        "Mélanger les ingrédients secsÂ : farine, levure, sel.\nMélanger les jaunes d'oeufs et le lait. Et ajouter aux ingrédients secs.\nLaisser reposer de 15 à 30 minutes.\nBattre les blancs en neige et les ajouter à la préparation.",
      peopleNumber: 0,
      imageDataUrl: "",
      kind: 2,
    },
  });
});

app.post("/miam/recipes", (req: Request, res: Response) => {
  res.status(201).json({ message: "Recipe successfully added" });
});

app.put("/miam/recipes/:id", (req: Request, res: Response) => {
  res.status(200).json({ message: "Recipe successfully updated" });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
