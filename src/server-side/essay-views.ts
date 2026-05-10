import { getCollection } from "@/server-side/db";

type EssayViewDoc = {
  essayId: string;
  views: number;
};

export async function getEssayViews(essayId: string): Promise<number | null> {
  if (!import.meta.env.MONGODB_URI) return null;
  try {
    const coll = await getCollection<EssayViewDoc>("essay_views");
    const doc = await coll.findOne({ essayId });
    return doc?.views ?? 0;
  } catch (e) {
    console.error("getEssayViews:", e);
    return null;
  }
}

export async function incrementEssayViews(essayId: string): Promise<number | null> {
  if (!import.meta.env.MONGODB_URI) return null;
  try {
    const coll = await getCollection<EssayViewDoc>("essay_views");
    await coll.updateOne(
      { essayId },
      { $inc: { views: 1 }, $setOnInsert: { essayId } },
      { upsert: true },
    );
    const doc = await coll.findOne({ essayId });
    return doc?.views ?? null;
  } catch (e) {
    console.error("incrementEssayViews:", e);
    return null;
  }
}
