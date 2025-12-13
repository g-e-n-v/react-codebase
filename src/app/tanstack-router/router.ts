import { createRouter } from "@tanstack/react-router";
import { routeTree } from "$/tanstack-router/route-tree.gen";

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  // biome-ignore lint/style/useConsistentTypeDefinitions: override
  interface Register {
    router: typeof router;
  }
}
