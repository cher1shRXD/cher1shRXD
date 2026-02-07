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
        revalidatePath(`/projects/${body.entity.id}`);
        fetch(`https://www.cher1shrxd.me/projects`)
          .then(() => console.log("Projects page pre-built"))
          .catch((error) => console.error("Error fetching projects page:", error));
        fetch(`https://www.cher1shrxd.me/projects/${body.entity.id}`)
          .then(() => console.log(`Project ${body.entity.id} page pre-built`))
          .catch((error) => console.error("Error fetching project page:", error));
        break;
      case 1:
        revalidatePath("/blog");
        revalidatePath(`/blog/${body.entity.id}`);
        fetch(`https://www.cher1shrxd.me/blog`)
          .then(() => console.log("Blog list page pre-built"))
          .catch((error) => console.error("Error fetching blog page:", error));
        notion.pages.retrieve({ page_id: body.entity.id })
          .then((page) => {
            const typedPage = page as ResultResponse<BlogPost>;
            const status = typedPage.properties.status.status.name;
            const emailSent = typedPage.properties.email_sent.checkbox;
            
            fetch(`https://www.cher1shrxd.me/blog/${body.entity.id}`)
              .then(() => console.log(`Blog ${body.entity.id} page pre-built`))
              .catch((error) => console.error("Error fetching blog detail page:", error));

            if (status === "Published" && !emailSent) {
              const title = typedPage.properties.name.title[0]?.plain_text || "새 글";
              const postUrl = `https://www.cher1shrxd.me/blog/${body.entity.id}`;
              
              return sendNewPostNotification(title, postUrl)
                .then(() => {
                  return notion.pages.update({
                    page_id: body.entity.id,
                    properties: {
                      email_sent: { checkbox: true }
                    }
                  });
                });
            }
          })
          .then((result) => {
            if (result) {
              console.log("Blog notification sent and email_sent updated");
            }
          })
          .catch((error) => console.error("Error processing blog notification:", error));
        break;
      default:
        revalidatePath("/");
        fetch("https://www.cher1shrxd.me/")
          .then(() => console.log("Home page pre-built"))
          .catch((error) => console.error("Error fetching home page:", error));
        break;
    }
  }

  return NextResponse.json({ message: "Webhook received" }, { status: 200 });
}
