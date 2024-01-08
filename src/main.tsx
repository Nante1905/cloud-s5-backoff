import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import TestComponent from "./components/test/test.component.tsx";
import Template from "./components/template";
import TemplateForm from "./components/TemplateForm";

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
        element: <TestComponent />,
      },
      {
        path: "template",
        element: <Template />
      },
      {
        path: "template_form",
        element: <TemplateForm />
      }
      ,
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);
