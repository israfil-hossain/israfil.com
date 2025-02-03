// store/profileStore.ts
import { create } from 'zustand';

const useProjectsStore = create<any>((set) => ({
  projectData: null,
  setProjectsData: (data:any) => set({ projectData: data }), 
}));

export default useProjectsStore;