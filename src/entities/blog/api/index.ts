import { notion } from "@/shared/libs/notion";
import { ResultResponse } from "@/shared/types/result-response";
import { BlogPost } from "../types";
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { NotionBlockWithChildren } from "@/shared/types/notion-block-with-children";

export const BlogApi = {
  id: process.env.BLOG_DB_ID!,

  async getAndIncrementView(blockId: string) {
    const res = await fetch(`/api/blog/${blockId}/view`, { method: "POST" });
    if (!res.ok) throw new Error("Failed to increment view");
    return res.json();
  },

  async getLikeStatus(blockId: string) {
    const res = await fetch(`/api/blog/${blockId}/like`, { method: "GET" });
    if (!res.ok) throw new Error("Failed to fetch like status");
    return await res.json();
  },

  async like(blockId: string, action: "like" | "unlike") {
    const res = await fetch(`/api/blog/${blockId}/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    if (!res.ok) throw new Error("Failed to update like");
    return await res.json();
  },

  async getPosts(size?: number) {
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
          property: "sort",
          direction: "descending",
        },
      ],
      page_size: size,
    });

    return res.results as ResultResponse<BlogPost>[];
  },

  async getPostById(blockId: ResultResponse<BlogPost>["id"]) {
    const page = await notion.pages.retrieve({ page_id: blockId });
    const properties = (page as ResultResponse<BlogPost>).properties;

    const blocks: NotionBlockWithChildren[] = [];
    let cursor: string | undefined;

    while (true) {
      const res = await notion.blocks.children.list({
        block_id: blockId,
        start_cursor: cursor,
      });

      const fullBlocks = res.results.filter(
        (block): block is BlockObjectResponse => "type" in block,
      );

      blocks.push(...fullBlocks);

      if (!res.has_more) break;
      cursor = res.next_cursor ?? undefined;
    }

    for (const block of blocks) {
      if (block.has_children) {
        const childBlocks = await this.getBlockChildren(block.id);
        block.children = childBlocks;
      }
    }

    return { properties, blocks };
  },

  async getBlockChildren(blockId: string): Promise<NotionBlockWithChildren[]> {
    const blocks: NotionBlockWithChildren[] = [];
    let cursor: string | undefined;

    while (true) {
      const res = await notion.blocks.children.list({
        block_id: blockId,
        start_cursor: cursor,
      });

      const fullBlocks = res.results.filter(
        (block): block is BlockObjectResponse => "type" in block,
      );

      blocks.push(...fullBlocks);

      if (!res.has_more) break;
      cursor = res.next_cursor ?? undefined;
    }

    for (const block of blocks) {
      if (block.has_children) {
        block.children = await this.getBlockChildren(block.id);
      }
    }

    return blocks;
  },

  async subscribeEmail(email: string) {
    if (!email.trim() || !/^[\w-.]+@[\w-]+\.[\w-.]+$/.test(email)) {
      return {
        success: false,
        error: "유효한 이메일 주소를 입력해주세요.",
      };
    }
    try {
      const res = await fetch("/api/blog/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, action: "subscribe" }),
      });
      const data = await res.json();
      if (res.ok && data.subscribed) {
        return {
          success: true,
          message: "구독해주셔서 감사합니다! 새 글이 올라오면 알려드릴게요.",
        };
      } else {
        return {
          success: false,
          error: data.error || "구독 신청에 실패했습니다. 다시 시도해주세요.",
        };
      }
    } catch {
      return {
        success: false,
        error: "구독 신청에 실패했습니다. 다시 시도해주세요.",
      };
    }
  },

  async unsubscribeEmail(email: string) {
    try {
      const res = await fetch("/api/blog/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, action: "unsubscribe" }),
      });
      const data = await res.json();
      if (res.ok && data.subscribed === false) {
        return {
          success: true,
          message: "구독이 해지되었습니다.",
        };
      } else {
        return {
          success: false,
          error: data.error || "구독 해지에 실패했습니다. 다시 시도해주세요.",
        };
      }
    } catch {
      return {
        success: false,
        error: "구독 해지에 실패했습니다. 다시 시도해주세요.",
      };
    }
  },
};
