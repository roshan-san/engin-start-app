import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { profileQueryOptions } from "~/lib/auth/queries";

export const Route = createFileRoute("/(authenticated)/onboard")({
  component: RouteComponent,
  beforeLoad: async ({ context, location }) => {
    const profile = await context.queryClient.ensureQueryData(profileQueryOptions());

    // No profile yet? send user to first step
    if (!profile) {
      if (location.pathname !== "/onboard/name") {
        throw redirect({ to: "/onboard/name" });
      }
      return;
    }

    const hasLocation = Boolean(profile.city || profile.state || profile.country);

    // Enforce step order
    if (!profile.user_type && location.pathname !== "/onboard/user-type") {
      throw redirect({ to: "/onboard/user-type" });
    }

    if (!hasLocation && location.pathname !== "/onboard/location") {
      throw redirect({ to: "/onboard/location" });
    }

    if (profile.onboarding_complete && location.pathname !== "/a/dashboard") {
      throw redirect({ to: "/a/dashboard" });
    }
  },
});

function RouteComponent() {
  return (
    <div className="grid min-h-screen grid-cols-12 gap-2 p-2">
      <div className="col-span-6 flex items-center justify-center bg-yellow-500">
        <p className="text-2xl font-bold">Some Illustration</p>
      </div>
      <Outlet />
    </div>
  );
}
