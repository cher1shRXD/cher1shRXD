export const runtime = "nodejs";

import { NextResponse } from "next/server";
import clientPromise from "@/shared/libs/mongodb";

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();
    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();
    const now = new Date();

    await db
      .collection("clients")
      .updateOne({ userId }, { $set: { lastAccessed: now } }, { upsert: true });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DB error:", error);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}
