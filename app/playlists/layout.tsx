import { Player } from "@/components/domain/player/Player";
import { PlayerCompleteModal } from "@/components/domain/player/PlayerCompleteModal";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      {children}
      <Player />
      <PlayerCompleteModal />
    </>
  );
}
