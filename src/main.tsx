import { ThemeProvider, createTheme } from "@mui/material";
import { frFR } from "@mui/x-date-pickers";
import React from "react";
import ReactDOM from "react-dom/client";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import AjoutCategorieComponent from "./components/crud/categorie/pages/ajout-categorie.component";
import EditCategorieComponent from "./components/crud/categorie/pages/edit-categorie.components";
import AjoutCouleurComponent from "./components/crud/couleur/pages/ajout-couleur.component";
import EditCouleurComponent from "./components/crud/couleur/pages/edit-couleur.components";
import CategorieListComponentRoot from "./components/crud/categorie/pages/list.component";
import CouleurListComponentRoot from "./components/crud/couleur/pages/list.component";
import Dashboard from "./components/statistique/pages/dashboard.component.tsx";
import "./index.css";
import AjoutEnergieComponent from "./components/crud/energie/pages/ajout-energie.component";
import EnergieListComponentRoot from "./components/crud/energie/pages/list.component";
import EditEnergieComponent from "./components/crud/energie/pages/edit-energie.components";
import AjoutEtatComponent from "./components/crud/etat/pages/ajout-etat.component";
import EtatListComponentRoot from "./components/crud/etat/pages/list.component";
import EditEtatComponent from "./components/crud/etat/pages/edit-etat.components";

const theme = createTheme(
  {
    typography: {
      fontFamily: "Jost",
    },
  },
  frFR
);

const routes = createBrowserRouter([
  {
    path: "",
    element: (
      <App>
        <Outlet />
      </App>
    ),
    children: [
      {
        path: "couleurs/add",
        element: <AjoutCouleurComponent />,
      },
      {
        path: "couleurs",
        element: <CouleurListComponentRoot />,
      },
      {
        path: "couleurs/edit/:id",
        element: <EditCouleurComponent />,
      },
      {
        path: "categories/add",
        element: <AjoutCategorieComponent />,
      },
      {
        path: "categories",
        element: <CategorieListComponentRoot />,
      },
      {
        path: "categories/edit/:id",
        element: <EditCategorieComponent />,
      },
      {
        path: "energies/add",
        element: <AjoutEnergieComponent />,
      },
      {
        path: "energies",
        element: <EnergieListComponentRoot />,
      },
      {
        path: "energies/edit/:id",
        element: <EditEnergieComponent />,
      },

      {
        path: "etats/add",
        element: <AjoutEtatComponent />,
      },
      {
        path: "etats",
        element: <EtatListComponentRoot />,
      },
      {
        path: "etats/edit/:id",
        element: <EditEtatComponent />,
      },

      // {
      //   path: "test",
      //   element: <StatsChart />,
      // },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={routes} />
    </ThemeProvider>
  </React.StrictMode>
);
