"use client";

import { useRouter } from "next/navigation";
import { UserRecord } from "firebase-admin/auth";
import Image from 'next/image';
import { signInWithGoogle } from "@/lib/firebase/auth";
import Link from 'next/link';


export default function PageContent({
  variant,
  currentUser,
}: {
  variant: "sign-in" | "community";
  currentUser?: UserRecord;
}) {
  const router = useRouter();
  const handleSignIn = async () => {
    const isOk = await signInWithGoogle();
    router.push("/playground");
  };

  if (variant === "sign-in")
    return (
      <div className="flex items-center justify-center pt-40">
        <div className="bg-white gap-5 flex flex-col rounded shadow-md p-10 transition-transform w-96 text-center">
        <Link href="/"><Image src="/podcast_logo.png" alt="podsicle logo"
            height={100}
            width={540}
          /></Link>
          <h1>Choose Your Login Credential</h1>
          <div className="flex pt-5 justify-center items-center">
        <button className="bg-indigo-500 text-white py-3 px-6 rounded -md cursor-pointer transition-colors duration-300 hover:bg-indigo-500 px-10 py-3 text-sm font-medium text-white transition-colors hover:bg-pink-400 md:text-base" onClick={handleSignIn}>
          Sign In with Google
        </button>
        </div>
        </div>
      </div>
    );
  else return null;
}