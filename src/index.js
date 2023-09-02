import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

import Dashboard from "./pages/notes/Dashboard";
import {
  DashboardProtectedRoute,
  LoginProtectedRoute,
} from "./pages/private/Dashboard";
import AddPage from "./pages/notes/AddPage";
import UpdatePage from "./pages/notes/UpdatePage";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <LoginProtectedRoute>
          <App />
        </LoginProtectedRoute>
      </>
    ),
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/register",
    element: <Register />,
  },
  {
    path: "/notes/add",
    element: <AddPage />,
  },
  {
    path: "/notes/update/:id",
    element: <UpdatePage />,
  },
  {
    path: "/notes/dashboard",
    element: (
      <>
        <DashboardProtectedRoute>
          <Dashboard />
        </DashboardProtectedRoute>
      </>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
