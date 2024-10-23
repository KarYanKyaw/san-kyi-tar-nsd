import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { PlusCircle } from "@phosphor-icons/react";
import { Button } from "../ui/button";

const DashboardControlSheet = ({
  isHidden,
  closeRef,
  children,
  openSheet,
  disabled,
}) => {
  return (
    <Sheet className="!z-[1005]">
      <SheetTrigger
        className={`${isHidden && " hidden"}`}
        disabled={disabled}
        ref={openSheet}
        asChild
      >
        <Button className=" hover:bg-neutral-800 bg-neutral-900">
          <PlusCircle className=" w-6 h-6 me-1" /> Add
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>NSD</SheetTitle>
          <SheetDescription>Customize Your website!</SheetDescription>
        </SheetHeader>
        <div className=" my-8">{children}</div>
        <SheetFooter className={"flex !justify-between items-center"}>
          <SheetClose asChild>
            <Button ref={closeRef} className="hidden" variant="link">
              Cancel
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button className="hidden" size="sm">
              Save changes
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default DashboardControlSheet;
