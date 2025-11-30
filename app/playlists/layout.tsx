import { Player } from "@/components/domain/player/Player";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      {children}
      <Player />
    </>
  );
}
