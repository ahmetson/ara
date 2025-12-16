export interface Personalization {
  _id?: string;
  context: string; // e.g., "GalaxyLayoutBody"
  userId: string;
  code: string; // Generated JavaScript code
  prompt: string; // User's original request
  createdTime: Date;
  uris: string[]; // Array of URIs where this applies
}
