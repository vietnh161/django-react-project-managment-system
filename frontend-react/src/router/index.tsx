import React from "react";
import ProtectedRoute from "./guards/ProtectedRoute";
import { createBrowserRouter, Navigate } from "react-router-dom";
import ErrorPage from "@/pages/error/ErrorPage";
import AppLayout from "@/layouts/AppLayout/AppLayout";
import HomePage from "@/pages/home/HomePage";
import LoginLayout from "@/layouts/LoginLayout/LoginLayout";
import LoginPage from "@/pages/login/LoginPage";
import ProjectPage from "@/pages/projects/ProjectPage";
import ProjectDetailsLayout from "@/layouts/ProjectDetailsLayout/ProjectDetailsLayout";
import ActiveSprint from "@/pages/ActiveSprint/ActiveSprint";
import Backlog from "@/pages/Backlog/Backlog";

export const router = createBrowserRouter([
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Navigate to="/home" />,
      },
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/projects",
        element: <ProjectPage />,
      },
      {
        path: "/projects/:id",
        element: <ProjectDetailsLayout />,
        children: [
          {
            path: "",
            element: <Navigate to="active-sprint" />,
          },
          {
            path: "active-sprint",
            element: <ActiveSprint />,
          },
          {
            path: "backlog",
            element: <Backlog />,
          },
        ],
      },
    ],
  },
  {
    element: <LoginLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
]);
