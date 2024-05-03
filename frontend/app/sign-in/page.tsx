import { redirect } from "next/navigation";
import { isUserAuthenticated } from "@/lib/firebase/firebase-admin";
import PageContent from "../../components/login";

export default async function SignInPage() {
  if (await isUserAuthenticated()) redirect("/community");

  return (
    <main className="container">
      <PageContent variant="sign-in" />
    </main>
  );
}