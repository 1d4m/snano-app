import { Play } from "lucide-react";

function Player() {
  const count = 150;
  const limit = 300;

  return (
    <div className="fixed bottom-2 w-[calc(100%-16px)] h-13 mx-2 bg-[#0A0A0A] border border-[#2b2b2b] rounded-lg flex flex-col justify-between overflow-hidden">
      <div className="flex items-center justify-between gap-x-2 p-2">
        <div className="flex items-center gap-x-2">
          <div className="size-8 rounded bg-[#121212]"></div>
          <div className="text-sm">タイトル</div>
        </div>
        <div className="flex items-center justify-center">
          <button>
            <Play className="size-4.5" />
          </button>
        </div>
      </div>
      <div
        className="h-0.5 bg-[#05DF72] transition-all duration-300"
        style={{ width: `${(count / limit) * 100}%` }}
      ></div>
    </div>
  );
}

export { Player };
