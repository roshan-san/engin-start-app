import { createFileRoute } from "@tanstack/react-router";
import { Card } from "~/components/ui/card";

export const Route = createFileRoute("/(authenticated)/a/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Card className="flex flex-1 items-center justify-center gap-2">
      <h1 className="text-2xl font-bold">Dashboard</h1>
    </Card>
  );
}
