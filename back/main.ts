import express, { Request, Response } from "express";
import cors from "cors";
import {
  getAllRecipes,
  getOneRecipe,
  insertOneRecipe,
  updateOneRecipe,
} from "./src/db";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ message: "OK" });
});

app.get("/miam/recipes", async (req: Request, res: Response) => {
  const recipes = await getAllRecipes();
  res.json({
    count: recipes.length,
    recipes,
  });
});

app.get("/miam/recipes/:recipeId", async (req: Request, res: Response) => {
  const recipe = await getOneRecipe(parseInt(req.params.recipeId, 10));
  res.json({
    recipe,
  });
});

app.post("/miam/recipes", async (req: Request, res: Response) => {
  await insertOneRecipe(req.body);
  res.status(201).json({ message: "Recipe successfully added" });
});

app.put("/miam/recipes/:id", async (req: Request, res: Response) => {
  await updateOneRecipe(req.body);
  res.json({ message: "Recipe successfully updated" });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
