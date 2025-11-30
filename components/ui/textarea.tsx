import { Textarea as OriginalTextarea } from "@/lib/shadcn/textarea";

type Props = {
  placeholder?: string;
};

function Textarea({ placeholder }: Props) {
  return <OriginalTextarea placeholder={placeholder} />;
}

export { Textarea };
