import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import {
  getAllRecipes,
  getOneRecipe,
  insertOneRecipe,
  updateOneRecipe,
} from "./db";

const app = express();
const port = process.env.PORT || 8084;
const RECIPES_API = "/api/miam/recipes";

app.use(morgan("combined"));

app.use(cors());

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ message: "OK" });
});

app.get(`${RECIPES_API}`, async (req: Request, res: Response) => {
  const recipes = await getAllRecipes();
  res.json({
    count: recipes.length,
    recipes,
  });
});

app.get(`${RECIPES_API}/:recipeId`, async (req: Request, res: Response) => {
  const recipe = await getOneRecipe(parseInt(req.params.recipeId, 10));
  res.json({
    recipe,
  });
});

app.post(`${RECIPES_API}`, async (req: Request, res: Response) => {
  await insertOneRecipe(req.body);
  res.status(201).json({ message: "Recipe successfully added" });
});

app.put(`${RECIPES_API}/:recipeId`, async (req: Request, res: Response) => {
  await updateOneRecipe(parseInt(req.params.recipeId, 10), req.body);
  res.json({ message: "Recipe successfully updated" });
});

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: "404 Not found" });
});

app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack);
  res.status(500).json({ message: "500 Internal Server Error" });
});

process.on("SIGTERM", shutDown);
process.on("SIGINT", shutDown);

function shutDown() {
  console.log("Received kill signal, shutting down gracefully");

  server.close(() => {
    console.log("Closed out remaining connections");
    process.exit(0);
  });

  setTimeout(() => {
    console.error(
      "Could not close connections in time, forcefully shutting down"
    );
    process.exit(1);
  }, 4000);
}
