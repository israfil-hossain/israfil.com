import { getProfile, getProjects } from "@/lib/query";

const ProfileAPI = {
    GetProfile : getProfile()
}

const ProjectAPI = {
    GetProject : getProjects(),
}
export {
    ProfileAPI,
    ProjectAPI
}