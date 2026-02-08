import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/shared/libs/mongodb";

const VIEW_LIMIT_HOURS = 6;

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ postId: string }> },
) {
  try {
    const { postId } = await params;
    const clientId = req.cookies.get("client_id")?.value;
    if (!clientId)
      return NextResponse.json({ error: "Missing client_id" }, { status: 400 });

    const client = await clientPromise;
    const db = client.db();
    const now = new Date();
    const totalViews = await db.collection("views").countDocuments({ postId });

    const existing = await db
      .collection("views")
      .findOne({ userId: clientId, postId });
    if (existing) {
      const lastViewed = new Date(existing.lastViewed);
      const diff = now.getTime() - lastViewed.getTime();
      if (diff < VIEW_LIMIT_HOURS * 60 * 60 * 1000) {
        return NextResponse.json({ viewed: true, views: totalViews });
      }
      await db
        .collection("views")
        .updateOne({ userId: clientId, postId }, { $set: { lastViewed: now } });
      return NextResponse.json({
        viewed: true,
        updated: true,
        views: totalViews,
      });
    } else {
      await db
        .collection("views")
        .insertOne({ userId: clientId, postId, lastViewed: now });
      return NextResponse.json({
        viewed: false,
        updated: true,
        views: totalViews + 1,
      });
    }
  } catch (error) {
    console.error("DB error:", error);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}
