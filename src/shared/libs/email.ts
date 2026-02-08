import { Resend } from "resend";

import { getActiveSubscribers } from "./subscriber";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendNewPostNotification(
  postTitle: string,
  postUrl: string
) {
  try {
    const subscribers = await getActiveSubscribers();
    if (subscribers.length === 0) {
      console.log("No active subscribers found");
      return;
    }

    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: subscribers,
      subject: `새로운 글이 올라왔어요: ${postTitle}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">새로운 블로그 글이 올라왔어요!</h1>
          <h2 style="color: #666;">${postTitle}</h2>
          <p style="color: #666; line-height: 1.6;">
            cher1shRXD 블로그에 새로운 글이 게시되었습니다. 지금 바로 읽어보세요!
          </p>
          <a href="${postUrl}" style="display: inline-block; margin: 20px 0; padding: 12px 24px; background-color: #7B2CBF; color: white; text-decoration: none; border-radius: 6px;">
            글 읽으러 가기
          </a>
          <hr style="margin: 40px 0; border: none; border-top: 1px solid #eee;" />
          <p style="color: #999; font-size: 12px;">
            더 이상 이메일을 받고 싶지 않으시면 <a href="mailto:${process.env.EMAIL_FROM}">여기</a>로 연락주세요.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Failed to send emails:", error);
      return;
    }

    console.log(`Email sent to ${subscribers.length} subscribers:`, data);
  } catch (error) {
    console.error("Error sending notifications:", error);
  }
}
