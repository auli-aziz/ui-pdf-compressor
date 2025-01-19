import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth/config";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { SignOutButton } from "@/components/ui/auth-button";
import VerifyEmailButton from "@/components/ui/verify-email-button";
import Subscription from "./subscription";

export default async function GeneralPage() {
  const session = await getServerSession(authConfig);

  const emailVerified = session?.user?.emailVerified
    ? new Date(session.user.emailVerified).toLocaleString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Not Verified";

  return (
    <section className="flex-1 flex flex-col gap-2 p-4 lg:p-8">
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
              defaultValue={session?.user?.name || ""}
              disabled
              className="border-gray-400"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              defaultValue={session?.user?.email || ""}
              disabled
              className="border-gray-400"
            />
          </div>
          <div>
            <Label htmlFor="emailVerified">Email Verified</Label>
            <div className="flex items-center gap-2">
              <Input
                defaultValue={emailVerified}
                disabled
                className="border-gray-400"
              />
              {!session?.user?.emailVerified && (
                <VerifyEmailButton email={session?.user?.email!} />
              )}
            </div>
          </div>
          <div className="mt-5 bg-orange-500 text-white w-fit rounded-lg">
            <SignOutButton />
          </div>
        </CardContent>
      </Card>
      <Subscription email={session?.user?.email!} />
    </section>
  );
}
