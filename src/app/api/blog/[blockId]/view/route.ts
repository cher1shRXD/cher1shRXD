import { NextRequest, NextResponse } from "next/server";
import { notion } from "@/shared/libs/notion";
import { cookies } from "next/headers";
import { ResultResponse } from "@/shared/types/result-response";
import { BlogPost } from "@/entities/blog/types";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ blockId: string }> }
) {
  try {
    const { blockId } = await params;
    const cookieStore = await cookies();
    const viewedCookie = cookieStore.get(`viewed_${blockId}`);

    if (viewedCookie) {
      return NextResponse.json(
        { message: "Already viewed" },
        { status: 200 }
      );
    }

    const page = await notion.pages.retrieve({ page_id: blockId }) as ResultResponse<BlogPost>;
    const currentViews = page.properties.views.number || 0;

    await notion.pages.update({
      page_id: blockId,
      properties: {
        views: {
          number: currentViews + 1,
        },
      },
    });

    const response = NextResponse.json({
      success: true,
      views: currentViews + 1,
    });

    response.cookies.set(`viewed_${blockId}`, "true", {
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error updating views:", error);
    return NextResponse.json(
      { error: "Failed to update views" },
      { status: 500 }
    );
  }
}
