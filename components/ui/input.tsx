import { Input as OriginalInput } from "@/lib/shadcn/input";

type Props = {
  placeholder?: string;
} & React.ComponentProps<"input">;

function Input({ placeholder, ...props }: Props) {
  return <OriginalInput placeholder={placeholder} {...props} />;
}

export { Input };
