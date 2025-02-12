"use client";
import React, { useState } from "react";
import SocialLinks from "@/components/social-links/SocialLinks";
import Image from "next/image";
import { Heading } from "../Heading";
import { Paragraph } from "../Paragraph";
import Link from "next/link";
import { Contact } from "../Contact";

const ProfileComponent = ({ profileData }: { profileData: any }) => {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  return (
    <div>
      <div className="w-full flex flex-col justify-center items-center py-5 mb-48">
        {/* Profile Image */}
        <div className="relative  flex items-center justify-center lg:w-80 w-32  lg:h-80 h-32 overflow-hidden rounded-full bg-gray-800  border-8 border-blue-50 ">
          {profileData?.profileImage?.image ? (
            <Image
              src={profileData?.profileImage.image}
              alt={profileData?.profileImage?.alt || "Profile Image"}
              fill
              className="object-cover"
            />
          ) : (
            <span className="text-4xl text-gray-200">👤</span>
          )}
        </div>
        <div className=" py-4 items-center justify-center space-y-1">
          <span className="text-3xl pr-3 text-yellow-500">👋 </span>
          <Heading className="font-black">
            Hi ! &nbsp; I&apos;m Israfil Hossain.
          </Heading>
          <Heading className="font-black text-[18px]" as="h4">
            Software Engineer Based on Bangladesh.{" "}
          </Heading>
          <div className="py-2 space-y-3">
            <Paragraph className="text-sm text-gray-200 mt-1 text-10">
              ✉️ {" Israfil166091@gmail.com"}
            </Paragraph>
            {profileData?.location && (
              <Paragraph className="text-sm text-gray-500 mt-1">
                📍 {profileData?.location}
              </Paragraph>
            )}
            <Paragraph className="text-sm text-gray-500 mt-1">
              📞 +880-1843566251
            </Paragraph>
            <SocialLinks profileData={profileData} className="flex" />

            <div
              onClick={() => setIsButtonClicked(!isButtonClicked)}
              className="bg-slate-900 w-32  text-center no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block"
            >
              Hire me
            </div>
            {isButtonClicked && (
              <div>
                <Contact type={true} />
              </div>
            )}
          </div>

          <div className="py-4 flex justify-center w-full ">
            <Image src="/Qrcode.png" width={150} height={150} alt="qrcode" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
