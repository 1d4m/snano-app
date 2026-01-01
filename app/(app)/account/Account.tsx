"use client";

import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

function AccountPage() {
  const handleSignOut = () => {
    signOut();
  };

  return (
    <>
      <Button onClick={handleSignOut}>サインアウト</Button>
    </>
  );
}

export { AccountPage };
