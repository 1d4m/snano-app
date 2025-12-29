"use client"

import { signIn } from "next-auth/react"

import { Button } from "@/components/ui/button"

export default function Login() {

  const handleSignIn = () => {
    signIn("google", {redirectTo: "/playlists"})

  }

  return (
    <div className="flex flex-col gap-y-4">
      <Button onClick={handleSignIn}>Google認証</Button>
    </div>
  )
}