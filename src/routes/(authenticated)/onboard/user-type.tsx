import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { useAppForm } from "~/components/form/AppForm";
import { userTypeFormOps } from "~/components/onboard/usertype-form";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Field, FieldGroup } from "~/components/ui/field";
import { Spinner } from "~/components/ui/spinner";
import { updateProfileFn } from "~/functions/profiles.fn";

export const Route = createFileRoute("/(authenticated)/onboard/user-type")({
  component: RouteComponent,
});

function RouteComponent() {
  const form = useAppForm({
    ...userTypeFormOps,
  });

  const mutation = useMutation({
    mutationFn: async () => {
      return await updateProfileFn({
        data: {
          user_type: form.getFieldValue("user_type"),
        },
      });
    },
    onSuccess: () => {
      toast.success("User type chosen successfully!");
    },
    onError: (error) => {
      toast.error("Failed to choose user type. Please try again.");
      console.error("Failed to choose user type. Please try again.", error);
    },
  });
  return (
    <div className="items-cente flex min-h-screen justify-center gap-2 p-2">
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>This is a card Title</CardTitle>
          <CardDescription>Who are you ?</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="user-type-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <form.AppField name="user_type">
                {(field) => <field.TextInput id="user Type" label="user Type" />}
              </form.AppField>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <Button type="submit" form="user-type-form" disabled={mutation.isPending}>
              {mutation.isPending ? <Spinner /> : null}
              Next
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
}
