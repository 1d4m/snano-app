import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/lib/shadcn/dropdown-menu";
import {
  DropdownMenuTrigger,
  DropdownMenu as OriginalDropdownMenu,
} from "@radix-ui/react-dropdown-menu";

type MenuItem = {
  id: string;
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  danger?: boolean;
  disabled?: boolean;
};

type Props = {
  trigger: React.ReactNode;
  items: MenuItem[];
};

function DropdownMenu({ trigger, items }: Props) {
  return (
    <OriginalDropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {items.map((item) => (
          <DropdownMenuItem
            key={item.id}
            onClick={item.onClick}
            disabled={item.disabled}
            className={item.danger ? "text-red-500" : ""}
          >
            <div className="flex items-center gap-x-2">
              {item.icon}
              {item.label}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </OriginalDropdownMenu>
  );
}

export { DropdownMenu };
