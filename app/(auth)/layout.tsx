import { auth } from "@/auth"

export default async function AuthLayout({children}: {children: React.ReactNode}) {
  const session = await auth()
  if(session?.user) {
    console.log(session.user)
  }

  return (
    <>
    {children}
    </>
  )
}