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

interface SocialLinksProps {
  socialLinks?: ProfileData['socialLinks'];
  label?: boolean;
  className?: any;
}

const SocialLinks = ({ socialLinks, label = true, className}: SocialLinksProps) => {
   const pathname = usePathname();
   
   const isActive = (href: string) => pathname === href;

   return (
    <div className={className}>
     {socialLinks?.map((link) => {
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
            )}/>}
          { label && <span>{link?.label}</span>}
          
        </Link>
      )})}
    </div>
  )
}

export default SocialLinks