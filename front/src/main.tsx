import React from "react";
import ReactDOM from "react-dom/client";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import ErrorPage from "./ErrorPage";
import RecipesPage from "./components/RecipesPage";
import Root from "./routes/Root";
import { getAllRecipes, getOneRecipe } from "./lib/api";
import "./main.css";
import RecipePage from "./components/RecipePage";

const router = createBrowserRouter([
  {
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Navigate to="/recipes" replace />,
      },
      {
        path: "/recipes",
        element: <RecipesPage />,
        loader: async () => {
          return getAllRecipes();
        },
      },
      {
        path: "/recipes/:recipeId",
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
