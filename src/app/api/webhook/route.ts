import {
  NotionWebhookEvent,
  NotionWebhookVerify,
} from "@/shared/types/notion-webhook-event";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { sendNewPostNotification } from "@/shared/libs/email";
import { notion } from "@/shared/libs/notion";
import { ResultResponse } from "@/shared/types/result-response";
import { BlogPost } from "@/entities/blog/types";

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

  const receivedId = body.data.parent.data_source_id;

  if (!receivedId) {
    return NextResponse.json({ message: "No data_source_id" }, { status: 200 });
  }

  try {
    if (receivedId === BLOG_DB_ID) {
      await handleBlogWebhook(body);
    }
    else if (receivedId === PROJECT_DB_ID) {
      await handleProjectWebhook(body);
    }
    else {
      revalidatePath("/");
    }
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ message: "Processing failed but acknowledged" }, { status: 200 });
  }

  return NextResponse.json({ message: "Webhook received" }, { status: 200 });
}

async function handleBlogWebhook(body: NotionWebhookEvent) {
  revalidatePath("/blog");
  
  if (body.type === "page.deleted") {
    return;
  }

  const pageId = body.entity.id;
  revalidatePath(`/blog/${pageId}`);

  try {
    const page = await notion.pages.retrieve({ page_id: pageId }) as ResultResponse<BlogPost>;
    const status = page.properties.status.status.name;
    const emailSent = page.properties.email_sent.checkbox;

    await Promise.all([
      fetch("https://www.cher1shrxd.me/blog")
        .then(() => console.log("Blog list warmed"))
        .catch((error) => console.error("Blog list warming failed:", error)),
      fetch(`https://www.cher1shrxd.me/blog/${pageId}`)
        .then(() => console.log(`Blog ${pageId} warmed`))
        .catch((error) => console.error(`Blog ${pageId} warming failed:`, error))
    ]);

    if (status === "Published" && !emailSent) {
      const title = page.properties.name.title[0]?.plain_text || "새 글";
      const postUrl = `https://www.cher1shrxd.me/blog/${pageId}`;

      await sendNewPostNotification(title, postUrl);
      console.log(`Email sent for blog: ${title}`);

      await notion.pages.update({
        page_id: pageId,
        properties: {
          email_sent: { checkbox: true }
        }
      });
      console.log(`email_sent flag updated for ${pageId}`);
    }
  } catch (error) {
    console.error("Blog webhook handling error:", error);
  }
}

async function handleProjectWebhook(body: NotionWebhookEvent) {
  revalidatePath("/projects");
  
  if (body.type === "page.deleted") {
    return;
  }

  const pageId = body.entity.id;
  revalidatePath(`/projects/${pageId}`);

  try {
    await Promise.all([
      fetch("https://www.cher1shrxd.me/projects")
        .then(() => console.log("Projects list warmed"))
        .catch((error) => console.error("Projects list warming failed:", error)),
      fetch(`https://www.cher1shrxd.me/projects/${pageId}`)
        .then(() => console.log(`Project ${pageId} warmed`))
        .catch((error) => console.error(`Project ${pageId} warming failed:`, error))
    ]);
  } catch (error) {
    console.error("Project webhook handling error:", error);
  }
}
