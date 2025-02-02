// types/profile.ts
export interface SocialLink {
  label: string;
  _key: string;
  icon: string;
  href: string;
}
export interface ProfileData {
    fullName: string;
    shortBio: string;
    email: string;
    socialLinks: SocialLink[]; 
    fullBio: string | null;
    resumeURL: string | null;
    skills: string[];
    _id: string;
    headline: string;
    profileImage: {
      alt: string;
      image: string;
    };
    location: string;
  }
  
  export interface ProfileStore {
    profileData: ProfileData | null;
    setProfileData: (data: ProfileData) => void;
  }