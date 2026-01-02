import { Navigation } from "@/components/domain/navigation/Navigation";
import { Player } from "@/components/domain/player/Player";
import { PlayerCompleteModal } from "@/components/domain/player/PlayerCompleteModal";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-xl mx-auto">
      {children}
      <Player />
      <PlayerCompleteModal />
      <Navigation />
    </div>
  );
}
