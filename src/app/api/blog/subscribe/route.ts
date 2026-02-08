import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/shared/libs/mongodb";

export async function POST(req: NextRequest) {
  try {
    const { email, action } = await req.json();
    if (!email) return NextResponse.json({ error: "Missing email" }, { status: 400 });
    const now = new Date();
    const client = await clientPromise;
    const db = client.db();

    if (action === "subscribe") {
      await db.collection("subscribes").updateOne(
        { email },
        { $set: { status: "active", subscribedAt: now } },
        { upsert: true }
      );
      return NextResponse.json({ subscribed: true });
    } else if (action === "unsubscribe") {
      await db.collection("subscribes").updateOne(
        { email },
        { $set: { status: "inactive" } }
      );
      return NextResponse.json({ subscribed: false });
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("DB error:", error);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}
