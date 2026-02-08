import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/shared/libs/mongodb";

const LIKE_LIMIT_SECONDS = 1;

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ postId: string }> },
) {
  try {
    const { postId } = await params;
    const clientId = req.cookies.get("client_id")?.value;
    const client = await clientPromise;
    const db = client.db();

    const totalLikes = await db.collection("likes").countDocuments({ postId });
    let liked = false;
    if (clientId) {
      const existing = await db.collection("likes").findOne({ userId: clientId, postId });
      liked = !!existing;
    }

    return NextResponse.json({ likes: totalLikes, liked });
  } catch (error) {
    console.error("DB error:", error);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ postId: string }> }) {
  try {
    const { postId } = await params;
    const clientId = req.cookies.get("client_id")?.value;
    if (!clientId) return NextResponse.json({ error: "Missing client_id" }, { status: 400 });
    const { action } = await req.json();

    const client = await clientPromise;
    const db = client.db();
    const now = new Date();

    const existing = await db.collection("likes").findOne({ userId: clientId, postId });
    const lastAction = existing?.lastAction ? new Date(existing.lastAction) : null;
    if (lastAction && now.getTime() - lastAction.getTime() < LIKE_LIMIT_SECONDS * 1000) {
      return NextResponse.json({ error: "Rate limit" }, { status: 429 });
    }

    if (action === "like") {
      if (!existing) {
        await db.collection("likes").insertOne({ userId: clientId, postId, lastAction: now });
      } else {
        await db.collection("likes").updateOne(
          { userId: clientId, postId },
          { $set: { lastAction: now } }
        );
      }
      // 최신 좋아요 수 집계
      const totalLikes = await db.collection("likes").countDocuments({ postId });
      return NextResponse.json({ liked: true, likes: totalLikes });
    } else if (action === "unlike") {
      if (existing) {
        await db.collection("likes").deleteOne({ userId: clientId, postId });
      }
      const totalLikes = await db.collection("likes").countDocuments({ postId });
      return NextResponse.json({ liked: false, likes: totalLikes });
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("DB error:", error);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}
