import Image from "next/image";

import { auth } from "@/auth";

const getUser = async () => {
  const session = await auth();
  return session?.user;
};

async function AccountInfo() {
  const user = await getUser();

  return (
    <div className="flex items-center gap-x-2">
      <div className="inline-flex overflow-hidden rounded-full">
        <Image src={user?.image ?? ""} alt="" width={40} height={40} />
      </div>
      <div>
        <div className="text-sm text-neutral-400">{user?.name}</div>
        <div className="text-sm text-neutral-400">{user?.email}</div>
      </div>
    </div>
  );
}

export { AccountInfo };
