import { ThemeProvider, createTheme } from "@mui/material";
import { frFR } from "@mui/x-date-pickers";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import AnnonceRoot from "./components/annonce/container/annonce-root.component.tsx";
import AjoutCategorieComponent from "./components/crud/categorie/pages/ajout-categorie.component";
import EditCategorieComponent from "./components/crud/categorie/pages/edit-categorie.components";
import CategorieListComponentRoot from "./components/crud/categorie/pages/list.component";

import EditCouleurComponent from "./components/crud/couleur/pages/edit-couleur.components";
import CouleurListComponentRoot from "./components/crud/couleur/pages/list.component";
import AjoutEnergieComponent from "./components/crud/energie/pages/ajout-energie.component";
import EditEnergieComponent from "./components/crud/energie/pages/edit-energie.components";
import EnergieListComponentRoot from "./components/crud/energie/pages/list.component";
import AjoutEtatComponent from "./components/crud/etat/pages/ajout-etat.component";
import EditEtatComponent from "./components/crud/etat/pages/edit-etat.components";
import EtatListComponentRoot from "./components/crud/etat/pages/list.component";

import MarqueFormComponent from "./components/crud/marque/components/marque-form.components";
import FirebaseImageUpload from "./components/crud/marque/components/test";
import EditMarqueComponent from "./components/crud/marque/pages/edit-marque.components";
import MarqueListRoot from "./components/crud/marque/pages/list.component";

import Dashboard from "./components/statistique/pages/dashboard.component.tsx";
import DetailsAnnonceRoot from "./components/validation-annonce/pages/details-annonce.root.tsx";
import "./index.css";
import { store } from "./store/store.ts";
import AjoutCouleurComponent from "./components/crud/couleur/pages/ajout-couleur.component.tsx";

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
        path: "marques/edit/:id",
        element: <EditMarqueComponent />,
      },
      {
        path: "marques",
        element: <MarqueListRoot />,
      },
      {
        path: "marques/add",
        element: <MarqueFormComponent />,
      },
      {
        path: "test/test",
        element: <FirebaseImageUpload />,
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
        path: "couleurs/add",
        element: <AjoutCouleurComponent />,
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
      {
        path: "validation/:id",
        element: <DetailsAnnonceRoot />,
      },
      {
        path: "/annonce/validation",
        element: <AnnonceRoot />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <RouterProvider router={routes} />
      </ThemeProvider>
    </React.StrictMode>
  </Provider>
);
