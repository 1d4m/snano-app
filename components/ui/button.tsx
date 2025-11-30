import { Button as OriginalButton } from "@/lib/shadcn/button";

type Props = {
  children: React.ReactNode;
} & React.ComponentProps<typeof OriginalButton>;

function Button({ children, ...props }: Props) {
  return <OriginalButton {...props}>{children}</OriginalButton>;
}

export { Button };
