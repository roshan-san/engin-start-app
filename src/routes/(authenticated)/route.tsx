import { createFileRoute, Outlet } from "@tanstack/react-router";
import { authQueryOptions } from "~/lib/auth/queries";

export const Route = createFileRoute("/(authenticated)")({
  component: Outlet,
  beforeLoad: async ({ context }) => {
    const { user } = await context.queryClient.ensureQueryData(authQueryOptions());

    return { user };
  },
});
