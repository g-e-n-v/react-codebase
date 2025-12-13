import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    tanstackRouter({
      generatedRouteTree: "./src/app/tanstack-router/route-tree.gen.ts",
      indexToken: "page",
      routesDirectory: "./src/app/routes",
      routeToken: "layout",
    }),
    react(),
    tailwindcss(),
  ],
});
