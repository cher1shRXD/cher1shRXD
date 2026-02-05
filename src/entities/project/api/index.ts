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

  async getProjectBySlug(blockId: ResultResponse<Project>["id"]) {
    const blocks = [];
    let cursor: string | undefined;

    while (true) {
      const res = await notion.blocks.children.list({
        block_id: blockId,
        start_cursor: cursor,
      });

      blocks.push(...res.results);

      if (!res.has_more) break;
      cursor = res.next_cursor ?? undefined;
    }

    return blocks;
  },
};
