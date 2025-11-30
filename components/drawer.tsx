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

  onClose: () => void;
};

function Drawer({ isOpen, onClose }: Props) {
  return (
    <OriginalDrawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </OriginalDrawer>
  );
}

export { Drawer };
