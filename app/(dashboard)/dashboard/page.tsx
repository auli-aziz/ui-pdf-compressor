import { redirect } from "next/navigation";
import { getTeamForUser, getUser } from "@/lib/db/queries";
import { RequestSection } from "@/components/fragments/request-details";
import { CodePanel } from "@/components/fragments/code-panel";

export default async function SettingsPage() {
  const user = await getUser();

  // if (!user) {
  //   redirect('/login');
  // }

  return (
    <div className="flex h-full overflow-clip">
      <RequestSection />
      <CodePanel />
    </div>
  );
}
