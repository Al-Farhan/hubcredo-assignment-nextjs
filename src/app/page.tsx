"use client";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans ">
        <h2>You are not authenticated please login</h2>
        <Button onClick={() => router.push("/sign-in")}>Login</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans ">
      <h2>Welcome {session?.user.name}</h2>
      <Link href={"/dashboard"} className="underline">
        Dashboard
      </Link>
      <Button onClick={() => signOut()}>Sign Out</Button>
    </div>
  );
}
