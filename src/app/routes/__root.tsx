import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div className="m-4 rounded-md border border-rose-500 border-dashed">
      <div className="w-max px-2 py-1">RootLayout</div>

      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
}
