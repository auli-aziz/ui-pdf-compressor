import { startTransition, useActionState } from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { useUser } from "@/lib/auth";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { authConfig } from "@/lib/auth/config";
import { getServerSession } from "next-auth";
import { SignOutButton } from "@/components/ui/auth-button";

export default async function GeneralPage() {
  const session = await getServerSession(authConfig);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // If you call the Server Action directly, it will automatically
    // reset the form. We don't want that here, because we want to keep the
    // client-side values in the inputs. So instead, we use an event handler
    // which calls the action. You must wrap direct calls with startTranstion.
    // When you use the `action` prop it automatically handles that for you.
    // Another option here is to persist the values to local storage. I might
    // explore alternative options.
    // startTransition(() => {
    //   formAction(new FormData(event.currentTarget));
    // });
  };

  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="text-lg lg:text-2xl font-medium text-gray-900 mb-6">
        General Settings
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter your name"
              defaultValue={session?.user?.name as string}
              disabled
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              defaultValue={session?.user?.email as string}
              disabled
            />
          </div>
          {/* {state.error && (
              <p className="text-red-500 text-sm">{state.error}</p>
            )}
            {state.success && (
              <p className="text-green-500 text-sm">{state.success}</p>
            )} */}
          {/* <Button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white"
              disabled={false}
            >
              {false ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </form> */}
          <div className="mt-5 bg-orange-500 w-fit rounded-lg">
            <SignOutButton />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
