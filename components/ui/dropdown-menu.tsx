import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/lib/shadcn/dropdown-menu";
import {
  DropdownMenuTrigger,
  DropdownMenu as OriginalDropdownMenu,
} from "@radix-ui/react-dropdown-menu";

type Props = {
  children: React.ReactNode;
  items: { id: string; name: string }[];
  onClick: () => void;
};

function DropdownMenu({ children, items, onClick }: Props) {
  return (
    <OriginalDropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {items.map((i) => (
          <DropdownMenuItem key={i.id} onClick={onClick}>
            {i.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </OriginalDropdownMenu>
  );
}

export { DropdownMenu };
