"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import googleIcon from "@/public/google.png";

export default function Login() {
  const handleSignIn = () => {
    signIn("google", { redirectTo: "/playlists" });
  };

  return (
    <>
      <div className="flex items-center justify-center w-full h-16">
        <h1 className="font-bold text-sm">アカウント情報</h1>
      </div>
      <div className="flex flex-col gap-y-4 px-5">
        <Button size="lg" className="rounded-full" onClick={handleSignIn}>
          <Image src={googleIcon} alt="Google" width={20} height={20} />
          <span>Googleアカウントでログイン</span>
        </Button>
      </div>
    </>
  );
}
