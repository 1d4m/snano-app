"use client"

import { signOut } from "next-auth/react"

import { Button } from "@/components/ui/button"

export default function Account() {
  const handleSignOut = () => {
    signOut()
  }

  return (
    <Button onClick={handleSignOut}>sign out</Button>
  )
}