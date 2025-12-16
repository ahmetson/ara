import { ObjectId } from 'mongodb';
import { getCollection } from './db';
import type { Personalization } from '@/types/personalization';

interface PersonalizationModel {
  _id?: ObjectId;
  context: string;
  userId: ObjectId;
  code: string;
  prompt: string;
  createdTime: Date;
  uris: string[];
}

/**
 * Create a new personalization
 */
export async function createPersonalization(
  personalization: Omit<Personalization, '_id' | 'createdTime'>
): Promise<string> {
  try {
    const collection = await getCollection<PersonalizationModel>('personalizations');
    const doc: Omit<PersonalizationModel, '_id'> = {
      context: personalization.context,
      userId: new ObjectId(personalization.userId),
      code: personalization.code,
      prompt: personalization.prompt,
      createdTime: new Date(),
      uris: personalization.uris,
    };
    const result = await collection.insertOne(doc);
    return result.insertedId.toString();
  } catch (error) {
    console.error('Error creating personalization:', error);
    throw error;
  }
}

/**
 * Get personalizations by user and context
 */
export async function getPersonalizationsByUserAndContext(
  userId: string,
  context: string
): Promise<Personalization[]> {
  try {
    const collection = await getCollection<PersonalizationModel>('personalizations');
    const results = await collection
      .find({
        userId: new ObjectId(userId),
        context: context,
      })
      .toArray();

    return results.map((doc) => ({
      _id: doc._id?.toString(),
      context: doc.context,
      userId: doc.userId.toString(),
      code: doc.code,
      prompt: doc.prompt,
      createdTime: doc.createdTime,
      uris: doc.uris,
    }));
  } catch (error) {
    console.error('Error getting personalizations:', error);
    return [];
  }
}

/**
 * Update personalization by ID
 */
export async function updatePersonalization(
  personalizationId: string,
  updates: { code?: string; prompt?: string; uris?: string[] }
): Promise<boolean> {
  try {
    const collection = await getCollection<PersonalizationModel>('personalizations');
    const updateDoc: any = {};
    if (updates.code !== undefined) updateDoc.code = updates.code;
    if (updates.prompt !== undefined) updateDoc.prompt = updates.prompt;
    if (updates.uris !== undefined) updateDoc.uris = updates.uris;

    const result = await collection.updateOne(
      { _id: new ObjectId(personalizationId) },
      { $set: updateDoc }
    );

    // Check if document was actually found and updated
    if (result.matchedCount === 0) {
      console.error('Personalization not found for update:', personalizationId);
      return false;
    }

    console.log('Personalization update result:', {
      personalizationId,
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount,
      updates
    });

    // Return true if document was matched (even if not modified, it means the update was applied)
    return result.matchedCount > 0;
  } catch (error) {
    console.error('Error updating personalization:', error);
    return false;
  }
}

/**
 * Delete personalization by ID
 */
export async function deletePersonalization(personalizationId: string): Promise<boolean> {
  try {
    const collection = await getCollection<PersonalizationModel>('personalizations');
    await collection.deleteOne({ _id: new ObjectId(personalizationId) });
    return true;
  } catch (error) {
    console.error('Error deleting personalization:', error);
    return false;
  }
}
