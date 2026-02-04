import { notion } from "@/shared/libs/notion";
import { ResultResponse } from "@/shared/types/result-response";
import { Project } from "../types";

export const ProjectApi = {
  id: process.env.PROJECT_DB_ID!,

  async getProjects() {
    const res = await notion.dataSources.query({
      data_source_id: this.id,
      filter: {
        property: "status",
        status: {
          equals: "Published",
        },
      },
      sorts: [
        {
          property: "created_at",
          direction: "descending",
        },
      ],
    });

    return res.results as ResultResponse<Project>[];
  },

  async getProjectBySlug(slug: number) {
    const res = await notion.dataSources.query({
      data_source_id: this.id,
      filter: {
        property: "slug",
        number: {
          equals: slug,
        },
      },
    });

    return res.results[0] as ResultResponse<Project>;
  }
};
