"use client";
import { navlinks } from "@/constants/navlinks";
import { Navlink } from "@/types/navlink";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Heading } from "./Heading";
import { Badge } from "./Badge";
import { AnimatePresence, motion } from "framer-motion";
import { IconLayoutSidebarRightCollapse } from "@tabler/icons-react";
import { isMobile } from "@/lib/utils";
import useProfileStore from "@/store/profileStore";
import { getProfile } from "@/sanity/lib/query";
import SocialLinks from "./social-links/SocialLinks";



export const Sidebar = () => {
  
  const [open, setOpen] = useState(isMobile() ? false : true);
  const { profileData, setProfileData } = useProfileStore();
  const [isLoading, setIsLoading] = useState(true); 
  
  useEffect(() => {
    // Fetch profile data from your API
    const fetchProfileData = async () => {
      try {
        setIsLoading(true); 
        const response = await getProfile();
        setProfileData(response[0]); 
        setIsLoading(false); 
      } catch (error) {
        console.error('Failed to fetch profile data:', error);
        setIsLoading(false); 
      }
    };

    fetchProfileData();
  }, [setProfileData]);

  if(isLoading){
    return "Loading .... "
  }
  
  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: -200 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.2, ease: "linear" }}
            exit={{ x: -200 }}
            className="px-6  z-[100] py-10 bg-neutral-100 max-w-[14rem] lg:w-fit  fixed lg:relative  h-screen left-0 flex flex-col justify-between"
          >
            <div className="flex-1 overflow-auto">
              <SidebarHeader profileImage={profileData?.profileImage?.image || "null"} fullName={profileData?.fullName || "Israfil Hossain"} />
              <Navigation setOpen={setOpen} />
            </div>
            <div onClick={() => isMobile() && setOpen(false)}>
              <Badge href="/resume" text="Read Resume" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        className="fixed lg:hidden bottom-4 right-4 h-8 w-8 border border-neutral-200 rounded-full backdrop-blur-sm flex items-center justify-center z-50"
        onClick={() => setOpen(!open)}
      >
        <IconLayoutSidebarRightCollapse className="h-4 w-4 text-secondary" />
      </button>
    </>
  );
};

export const Navigation = ({
  setOpen,

}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const pathname = usePathname();
  const { profileData } = useProfileStore();

  const isActive = (href: string) => pathname === href;

  return (
    <div className="flex flex-col space-y-1 my-10 relative z-[100]">
      {navlinks.map((link: Navlink) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={() => isMobile() && setOpen(false)}
          className={twMerge(
            "text-secondary hover:text-primary transition duration-200 flex items-center space-x-2 py-2 px-2 rounded-md text-sm",
            isActive(link.href) && "bg-white shadow-lg text-primary"
          )}
        >
          <link.icon
            className={twMerge(
              "h-4 w-4 flex-shrink-0",
              isActive(link.href) && "text-sky-500"
            )}
          />
          <span>{link.label}</span>
        </Link>
      ))}

      <Heading as="p" className="text-sm md:text-sm lg:text-sm pt-10 px-2">
        Socials
      </Heading>
      <SocialLinks profileData={profileData || null }/>
    </div>
  );
};

const SidebarHeader = ({fullName,profileImage}:{fullName:string | null, profileImage:string | null}) => {
  
  return (
    <Link href="/profile">
      <div className="flex space-x-2 border-b-2 border-gray-500 pb-5 ">
        <Image
          src={profileImage || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80"}
          alt="Avatar"
          height="40"
          width="40" 
          className="object-cover w-[44px] h-[45px] object-top rounded-full flex-shrink-0"
        />
        <div className="flex text-sm flex-col mt-2">
          <p className="font-bold text-primary">{fullName || "Israfil"}</p>
          <div className="flex space-x-2 ">
            <p className="font-light text-secondary text-[11px]">Developer</p>
            <p className="text-[10px]">|</p>
            <p className="font-light text-blue-400 text-[11px]">My Profile</p>
          </div>
          {/* <p className="font-bold text-primary">{fullName || ""}</p> */}
        </div>
      </div>
    </Link>
  );
};
