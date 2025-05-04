import { ProfileAPI } from '@/api/endpoint';
import { useQuery } from '@tanstack/react-query';

export const useProfileData = () => {
  return useQuery({
    queryKey: ['profileData'],
    queryFn: async () => {
      const data = await ProfileAPI.GetProfile;
      return data[0]; 
    },
    staleTime: 1000 * 60 * 5, 
  });
};
