"use server";

import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";

const CLIENT_ID_COOKIE = "client_id";
const COOKIE_MAX_AGE = 10 * 365 * 24 * 60 * 60;
const isProduction = process.env.NODE_ENV === "production";

export async function registerCookie() {
  if (!isProduction) {
    return;
  }
  const cookieStore = await cookies();
  let clientId = cookieStore.get(CLIENT_ID_COOKIE)?.value;
  if (!clientId) {
    clientId = uuidv4();
    cookieStore.set({
      name: CLIENT_ID_COOKIE,
      value: clientId,
      maxAge: COOKIE_MAX_AGE,
      domain: ".cher1shrxd.me",
    });
  }
  return clientId;
}
