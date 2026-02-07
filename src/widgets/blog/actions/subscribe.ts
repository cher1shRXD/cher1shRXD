"use server";

import { google } from "googleapis";

export async function subscribeEmail(email: string) {
  try {
    if (!email || !email.includes("@")) {
      return {
        success: false,
        error: "유효한 이메일 주소를 입력해주세요.",
      };
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    const existingData = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Sheet1!A:A",
    });

    const emails = existingData.data.values?.flat() || [];
    if (emails.includes(email)) {
      return {
        success: false,
        error: "이미 구독 중인 이메일입니다.",
      };
    }

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A:C",
      valueInputOption: "RAW",
      requestBody: {
        values: [[email, new Date().toISOString(), "active"]],
      },
    });

    return {
      success: true,
      message: "구독해주셔서 감사합니다! 새 글이 올라오면 알려드릴게요.",
    };
  } catch (error) {
    console.error("Subscribe error:", error);
    return {
      success: false,
      error: "구독 신청에 실패했습니다. 다시 시도해주세요.",
    };
  }
}
