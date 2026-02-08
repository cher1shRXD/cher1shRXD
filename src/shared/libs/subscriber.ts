import clientPromise from "@/shared/libs/mongodb";

export async function getActiveSubscribers(): Promise<string[]> {
  const client = await clientPromise;
  const db = client.db();
  const docs = await db.collection("subscribes").find({ status: "active" }).toArray();
  return docs.map((doc) => doc.email);
}
