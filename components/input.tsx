import { Input as OriginalInput } from "@/lib/shadcn/input";

type Props = {
  placeholder?: string;
};

function Input({ placeholder }: Props) {
  return <OriginalInput placeholder={placeholder} />;
}

export { Input };
