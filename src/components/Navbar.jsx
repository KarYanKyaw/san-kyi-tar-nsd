import React, { useRef } from "react";
import Container from "./Container";
import Logo from "./Logo";
import NavItems from "./NavItems";
import ContactInfo from "./ContactInfo";
import { Button } from "./ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = ({ activeSection }) => {
  const ham = useRef(null);
  const close = useRef(null);

  return (
    <>
      <div className=" fixed top-0 border-b lg:h-20 h-12 bg-white z-50 w-full">
        <Container>
          <div className=" flex justify-between h-full items-center">
            <Logo />
            <div className=" hidden lg:block">
              <NavItems close={close} />
            </div>
            <div className=" hidden lg:block">
              <ContactInfo />
            </div>
            <div className=" block lg:hidden">
              <Button onClick={() => ham.current.click()} variant={"link"}>
                <HamburgerMenuIcon color="blue" height={21} width={21} />
              </Button>
            </div>
          </div>
        </Container>
      </div>
      <div className=" lg:hidden">
        <Sheet className=" !z-[1005]">
          <SheetTrigger ref={ham}></SheetTrigger>
          <SheetContent>
            <SheetTitle className=" !font-normal text-base">
              <SheetDescription asChild>
                <NavItems close={close} ham={ham} />
              </SheetDescription>
            </SheetTitle>
          </SheetContent>
          <SheetFooter className={" hidden"}>
            <SheetClose asChild>
              <Button ref={close}>Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </Sheet>
      </div>
    </>
  );
};

export default Navbar;
