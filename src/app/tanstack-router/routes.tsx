import { RouterProvider } from "@tanstack/react-router";
import { router } from "$/tanstack-router/router";

export function TanstackRoutes() {
  return <RouterProvider router={router} />;
}
