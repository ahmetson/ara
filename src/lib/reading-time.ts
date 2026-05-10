/** Strip YAML frontmatter from markdown source for word counting. */
export function stripYamlFrontmatter(markdown: string): string {
  const trimmed = markdown.trimStart();
  if (!trimmed.startsWith("---")) return markdown;
  const afterFirst = trimmed.slice(3);
  const end = afterFirst.indexOf("\n---");
  if (end === -1) return markdown;
  return afterFirst.slice(end + 4).trimStart();
}

/** Rough reading time from markdown body (words / WPM, minimum 1 minute). */
export function estimateReadingMinutes(
  markdownBody: string,
  wordsPerMinute = 220,
): number {
  const plain = markdownBody
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#*_>`|]/g, " ")
    .replace(/\s+/g, " ");
  const words = plain.trim().split(/\s/).filter(Boolean).length;
  return Math.max(1, Math.round(words / wordsPerMinute));
}
