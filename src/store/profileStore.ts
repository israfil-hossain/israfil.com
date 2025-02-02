// store/profileStore.ts
import { create } from 'zustand';
import { ProfileStore } from './type/ProfileData';

const useProfileStore = create<ProfileStore>((set) => ({
  profileData: null, // Initial state
  setProfileData: (data) => set({ profileData: data }), 
}));

export default useProfileStore;