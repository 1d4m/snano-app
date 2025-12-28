import { Activity, FolderOpen, Search, User } from "lucide-react";
import Link from "next/link";

import { ROUTES } from "@/constants/routes";

const Navigation = () => {
  return (
    <div className="fixed bottom-0 w-full h-16 px-6 border-t border-neutral-400">
      <nav className="flex items-center justify-around gap-x-4 h-full">
        <div>
          <Link href={ROUTES.PLAYLIST.href}>
            <FolderOpen className="text-neutral-400 size-5" />
          </Link>
        </div>
        <div>
          <Link href={ROUTES.PLAYLIST.href}>
            <Search className="text-neutral-400 size-5" />
          </Link>
        </div>
        <div>
          <Link href={ROUTES.PLAYLIST.href}>
            <Activity className="text-neutral-400 size-5" />
          </Link>
        </div>
        <div>
          <Link href={ROUTES.PLAYLIST.href}>
            <User className="text-neutral-400 size-5" />
          </Link>
        </div>
      </nav>
    </div>
  );
};

export { Navigation };
