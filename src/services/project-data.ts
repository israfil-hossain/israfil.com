import { ProjectAPI } from '@/api/endpoint';
import { getSingleProject } from '@/lib/query';
import { Project } from '@/types/products';
import { useQuery } from '@tanstack/react-query';

export const useProjectData = () => {
  return useQuery({
    queryKey: ['projectData'],
    queryFn: async () => {
      const data = await ProjectAPI.GetProject;
      return data; 
    },
    staleTime: 1000 * 60 * 5, 
  });
};



export const useSingleProjectData = (slug: string) => {
  return useQuery<Project>({
    queryKey: ['singleProjectData', slug],
    queryFn: async () => await getSingleProject(slug),
    // enabled: !!slug,
    staleTime: 1000 * 60 * 5,
  });
};


