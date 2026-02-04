import { notion } from "@/shared/libs/notion";
import { ResultResponse } from "@/shared/types/result-response";
import { BlogPost } from "../types";

export const BlogApi = {
  id: process.env.BLOG_DB_ID!,

  async getPosts() {
    const res = await notion.dataSources.query({
      data_source_id: this.id,
      filter: {
        property: "status",
        status: {
          equals: "Published",
        }
      },
      sorts: [
        {
          property: "created_at",
          direction: "descending",
        },
      ],
    });

    return res.results as ResultResponse<BlogPost>[];
  },

  async getPostBySlug(slug: number) {
    const res = await notion.dataSources.query({
      data_source_id: this.id,
      filter: {
        property: "slug",
        number: {
          equals: slug,
        },
      },
    });

    return res.results[0] as ResultResponse<BlogPost>;
  },
};
