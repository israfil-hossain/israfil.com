'use client';

import { ProfileData } from '@/store/type/ProfileData';
import React from 'react'
import {
  IconBrandGithub,
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandMedium
} from '@tabler/icons-react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { usePathname } from 'next/navigation';

const iconComponents = {
  IconBrandGithub: IconBrandGithub,
  IconBrandFacebook: IconBrandFacebook,
  IconBrandLinkedin: IconBrandLinkedin,
  IconBrandTwitter: IconBrandTwitter,
  IconBrandMedium: IconBrandMedium
};

const SocialLinks = ({ profileData,label = true, className}: { profileData: ProfileData | null, label?: Boolean, className?: any }) => {
   const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <div className={className}>
     {profileData?.socialLinks?.map((link) => {
        const IconComponent = iconComponents[link.icon as keyof typeof iconComponents];
        return(
        <Link
          key={link.href}
          href={link.href}
          className={twMerge(
            "text-secondary hover:text-primary transition duration-200 flex flex-row items-center space-x-2 py-2 px-2 rounded-md text-sm",className
          )}
          
        >
          {IconComponent && <IconComponent  className={twMerge(
              "h-4 w-4 flex-shrink-0",
              isActive(link.href) && "text-sky-500"
            )}/>} {/* Render the icon if it exists */}
          { label && <span>{link?.label}</span>}
          
        </Link>
      )})}
    </div>
  )
}

export default SocialLinks