import { Project, ProjectDetails } from "@/models/Project";
import { axiosAPI, baseApi } from "./api";

export const getProjects = async () => {
  const response = await axiosAPI.get<Project[]>("projects");
  return response.data;
};

export const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<Project[], void>({
      query: () => "/projects",
    }),
    getProject: builder.query<Project, string>({
      query: (id) => `/projects/${id}`,
    }),
    getProjectDetails: builder.query<ProjectDetails, string>({
      query: (id) => `/projects/${id}/details`,
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectQuery,
  useGetProjectDetailsQuery,
} = postApi;
