import { NextRequest, NextResponse } from "next/server";
import { notion } from "@/shared/libs/notion";
import { ResultResponse } from "@/shared/types/result-response";
import { BlogPost } from "@/entities/blog/types";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ blockId: string }> }
) {
  try {
    const { blockId } = await params;
    const { liked } = await req.json();

    const page = await notion.pages.retrieve({ page_id: blockId }) as ResultResponse<BlogPost>;
    const currentLikes = page.properties.likes?.number || 0;
    const newLikes = liked ? currentLikes + 1 : Math.max(0, currentLikes - 1);

    await notion.pages.update({
      page_id: blockId,
      properties: {
        likes: {
          number: newLikes,
        },
      },
    });

    return NextResponse.json({
      success: true,
      likes: newLikes,
    });
  } catch (error) {
    console.error("Error updating likes:", error);
    return NextResponse.json(
      { error: "Failed to update likes" },
      { status: 500 }
    );
  }
}
