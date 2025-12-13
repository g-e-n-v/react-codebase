import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/playground")({
  component: PlaygroundLayout,
});

function PlaygroundLayout() {
  return (
    <div className="rounded-md border border-green-500 border-dashed p-4">
      <div className="font-semibold">PlaygroundLayout</div>

      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
}
