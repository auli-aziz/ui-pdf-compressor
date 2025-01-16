import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth/config";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { SignOutButton } from "@/components/ui/auth-button";

export default async function GeneralPage() {
  const session = await getServerSession(authConfig);

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
              defaultValue={session?.user?.name || ""}
              disabled
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              defaultValue={session?.user?.email || ""}
              disabled
            />
          </div>
          <div>
            <Label htmlFor="email">Email Verified</Label>
            <Input
              defaultValue={session?.user?.emailVerified || "Not Verified"}
              disabled
            />
          </div>
          <div className="mt-5 bg-orange-500 text-white w-fit rounded-lg">
            <SignOutButton />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
