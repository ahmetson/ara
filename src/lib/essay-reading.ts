import { estimateReadingMinutes, stripYamlFrontmatter } from "./reading-time";

const rawGlob = import.meta.glob<string>("../content/essays/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

export function readingMinutesForEssayId(id: string): number {
  const match = Object.entries(rawGlob).find(([path]) =>
    path.endsWith(`/${id}.md`),
  );
  if (!match) return 1;
  const raw = match[1];
  const body = stripYamlFrontmatter(raw);
  return estimateReadingMinutes(body);
}
