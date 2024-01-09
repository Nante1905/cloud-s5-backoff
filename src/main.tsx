import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./components/statistique/pages/dashboard.component.tsx";
import StatsChart from "./components/statistique/components/stats-chart/stats-chart.component.tsx";
import { ThemeProvider, createTheme } from "@mui/material";
import { frFR } from "@mui/x-date-pickers";

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
        path: "test",
        element: <StatsChart />,
      },
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
