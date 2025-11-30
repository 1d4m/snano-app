import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  Drawer as OriginalDrawer,
} from "@/lib/shadcn/drawer";
import { Button } from "./button";

type Props = {
  isOpen: boolean;
  description?: string;
  title?: string;
  submitText: string;
  cancelText?: string;
  children: React.ReactNode;
  onSubmit: () => void;
  onClose: () => void;
};

function Drawer({
  isOpen,
  title,
  description,
  children,
  submitText,
  cancelText = "キャンセル",
  onClose,
  onSubmit,
}: Props) {
  const handleSubmit = () => {
    onClose();
    onSubmit();
  };

  return (
    <OriginalDrawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <div className="p-4">{children}</div>
        <DrawerFooter>
          <Button onClick={handleSubmit}>{submitText}</Button>
          <DrawerClose asChild>
            <Button variant="outline">{cancelText}</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </OriginalDrawer>
  );
}

export { Drawer };
