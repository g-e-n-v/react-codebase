import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { router } from "$/tanstack-router/router";

export function TanstackRouterDevtools() {
  return <TanStackRouterDevtools router={router} />;
}
