'use client'; 
import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconHome,
  IconMessage2,
  IconTerminal2,
  IconBlockquote,
  IconAddressBook,
} from "@tabler/icons-react";
import useProfileStore from "@/store/profileStore";

export function FloatingNavbar() {
  const {profileData } = useProfileStore(); 
 
  const links = [
    {
      label: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-800" />
      ),
      href: "/",
    },

    {
      label: "About",
      icon: (
        <IconMessage2 className="h-full w-full text-neutral-800" />
      ),
      href: "/about",
    },
    {
      label: "Project",
      icon: (
        <IconTerminal2 className="h-full w-full text-neutral-800" />
      ),
      href: "/projects",
    },
    {
      label: "Articles",
      icon: (
        <IconBlockquote className="h-full w-full text-neutral-800" />
      ),
      href: "/blogs",
    },
    {
      label: "Contact",
      icon: (
        <IconAddressBook className="h-full w-full text-neutral-800" />
      ),
      href: "/contact",
    },
  ];

  return (
    <>
      <div className="flex items-center justify-center absolute bottom-24 right-2 z-50">
        <FloatingDock items={profileData?.socialLinks || []} isDesktop={false} />
      </div>

      <div className="flex w-full items-center justify-center absolute bottom-0 z-50">
        <FloatingDock items={links} />
      </div>
    </>
  );
}
