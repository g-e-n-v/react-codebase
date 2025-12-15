import "$/tailwindcss/global.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { composeProviders } from "$/shared/utils/compose-providers.util";
import { TanstackRouterDevtools } from "$/tanstack-router/devtools";
import { TanstackRoutes } from "$/tanstack-router/routes";

const Providers = composeProviders([StrictMode]);

createRoot(document.getElementById("root") as HTMLDivElement).render(
  <>
    <Providers>
      <TanstackRoutes />
    </Providers>

    {/* Devtools */}
    <TanstackRouterDevtools />
  </>,
);
