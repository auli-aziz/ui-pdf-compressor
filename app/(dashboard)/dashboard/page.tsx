import { redirect } from "next/navigation";
import { getTeamForUser, getUser } from "@/lib/db/queries";

export default async function SettingsPage() {
  const user = await getUser();

  // if (!user) {
  //   redirect('/login');
  // }

  return <>test</>;
}
