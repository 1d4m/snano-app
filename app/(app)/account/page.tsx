import { Suspense } from "react";

import { AccountPage } from "./Account";
import { AccountInfo } from "./AccountInfo";

export default function Account() {
  return (
    <>
      <div className="flex items-center justify-center w-full h-16">
        <h1 className="font-bold text-sm">アカウント情報</h1>
      </div>
      <div className="space-y-4 px-5">
        <Suspense fallback={<p>...loading</p>}>
          <AccountInfo />
        </Suspense>
        <AccountPage />
      </div>
    </>
  );
}
