'use client'; 

import useProfileStore from "@/store/profileStore";
import ProfileComponent from "@/components/profile";
export default function Profile() {
  const { profileData } = useProfileStore();

  return (
    <>
      <ProfileComponent profileData={profileData} /> 
    </>
  );
}
