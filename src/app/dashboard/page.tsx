"use client";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";

const Dashboard = () => {
  const { data } = useSession();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-zinc-50">
      <h1>Welcome: {data?.user?.name}</h1>
      <Button onClick={() => signOut()}>Sign Out</Button>
    </div>
  );
};

export default Dashboard;
