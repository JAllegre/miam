import React from "react";
import ReactDOM from "react-dom/client";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import ErrorPage from "./ErrorPage";
import RecipePage from "./components/RecipePage";
import RecipesPage from "./components/RecipesPage";
import { getAllRecipes, getOneRecipe } from "./lib/api";
import { Paths } from "./lib/constants";
import "./main.css";
import Root from "./routes/Root";

const router = createBrowserRouter([
  {
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Navigate to={Paths.Recipes} replace />,
      },
      {
        path: "/miam/",
        element: <Navigate to={Paths.Recipes} replace />,
      },
      {
        path: Paths.Recipes,
        element: <RecipesPage />,
        loader: async () => {
          return getAllRecipes();
        },
      },
      {
        path: `${Paths.Recipes}/:recipeId`,
        element: <RecipePage />,
        loader: async ({ params: { recipeId } }) => {
          return getOneRecipe(parseInt(recipeId || "", 10));
        },
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
