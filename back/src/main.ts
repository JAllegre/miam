import bodyParser from "body-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import {
  getAllRecipes,
  getOneRecipe,
  insertOneRecipe,
  updateOneRecipe,
} from "./db";

const PORT = process.env.PORT || 8084;
const RECIPES_API = "/api/miam/recipes";

const app = express();

app.use(morgan("combined"));

app.use(bodyParser.json({ limit: "50mb" }));

app.use(cors());

// HEALTH CHECK
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ message: "OK" });
});

// RECIPE API
app.get(
  `${RECIPES_API}`,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const recipes = await getAllRecipes();
      res.json({
        count: recipes.length,
        recipes,
      });
    } catch (err) {
      next(err);
    }
  }
);

app.get(
  `${RECIPES_API}/:recipeId`,
  async (req: Request, res: Response, next) => {
    try {
      const recipe = await getOneRecipe(parseInt(req.params.recipeId, 10));
      res.json({
        recipe,
      });
    } catch (err) {
      next(err);
    }
  }
);

app.post(
  `${RECIPES_API}`,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await insertOneRecipe(req.body);
      res.status(201).json({ message: "Recipe successfully added" });
    } catch (err) {
      next(err);
    }
  }
);

app.put(
  `${RECIPES_API}/:recipeId`,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await updateOneRecipe(parseInt(req.params.recipeId, 10), req.body);
      res.json({ message: "Recipe successfully updated" });
    } catch (err) {
      next(err);
    }
  }
);

app.post(
  `${RECIPES_API}/check-pwd`,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { password } = req.body;
      if (password !== "leaju") {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      res.status(200).json({ message: "Authorized" });
    } catch (err) {
      next(err);
    }
  }
);

// ERROR MANAGEMENT
app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: "404 Not found" });
});

app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
  console.error("Got an unexpected error", err);
  res.status(500).json({ message: "500 Internal Server Error" });
});

// START SERVER
const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// KILL SIGNALS
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

process.on("SIGTERM", shutDown);
process.on("SIGINT", shutDown);
