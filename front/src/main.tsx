import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import RecipesPage from "./RecipesPage";
import Root from "./routes/Root";

const router = createBrowserRouter([
  {
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <RecipesPage />,
      },
      {
        path: "recipes",
        element: <RecipesPage />,
      },

      {
        path: "recipes/:id",
        element: <RecipesPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
