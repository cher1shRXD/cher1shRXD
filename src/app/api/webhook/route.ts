import {
  NotionWebhookEvent,
  NotionWebhookVerify,
} from "@/shared/types/notion-webhook-event";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(reg: Request) {
  const body = (await reg.json()) as NotionWebhookEvent | NotionWebhookVerify;

  if ("verification_token" in body) {
    console.info(
      "Notion webhook verification token received:",
      body.verification_token,
    );
    return NextResponse.json({ message: "token received" }, { status: 200 });
  }

  const PROJECT_DB_ID = process.env.PROJECT_DB_ID!;
  const BLOG_DB_ID = process.env.BLOG_DB_ID!;
  const AWARD_DB_ID = process.env.AWARD_DB_ID!;
  const EDUCATION_DB_ID = process.env.EDUCATION_DB_ID!;
  const TECHSTACK_DB_ID = process.env.TECHSTACK_DB_ID!;
  const LICENSE_DB_ID = process.env.LICENSE_DB_ID!;

  const ids = [
    PROJECT_DB_ID,
    BLOG_DB_ID,
    AWARD_DB_ID,
    EDUCATION_DB_ID,
    TECHSTACK_DB_ID,
    LICENSE_DB_ID,
  ];

  const receivedId = body.data.parent.data_source_id;

  if (receivedId && ids.includes(receivedId)) {
    const idx = ids.indexOf(receivedId);
    switch (idx) {
      case 0:
        revalidatePath("/projects");
        break;
      case 1:
        revalidatePath("/blog");
        break;
      default:
        revalidatePath("/");
        break;
    }
  }

  return NextResponse.json({ message: "Webhook received" }, { status: 200 });
}
