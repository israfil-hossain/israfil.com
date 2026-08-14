// types/profile.ts
export interface SocialLink {
  label: string;
  _key: string;
  icon: string;
  href: string;
}

export interface SkillCategory {
  _id: string;
  title: string;
  order: number;
}

export interface Skill {
  _id: string;
  name: string;
  icon?: string;
  order: number;
  category: SkillCategory;
}

export interface ProfileData {
    fullName: string;
    shortBio: string;
    email: string;
    phone: string;
    socialLinks: SocialLink[];
    fullBio: string | null;
    resumeURL: string | null;
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