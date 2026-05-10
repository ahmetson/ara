"use client";

import { useEffect, useState } from "react";

interface EssayFooterProps {
  essayId: string;
  title: string;
  shareUrl: string;
}

export default function EssayFooter({
  essayId,
  title,
  shareUrl,
}: EssayFooterProps) {
  const [views, setViews] = useState<number | null | undefined>(undefined);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const key = `essay-view-recorded:${essayId}`;
    let cancelled = false;

    async function load() {
      try {
        const already =
          typeof sessionStorage !== "undefined" &&
          sessionStorage.getItem(key);

        if (!already) {
          const res = await fetch("/api/essay-view", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: essayId }),
          });
          const data = (await res.json()) as { views?: number | null };
          if (
            typeof sessionStorage !== "undefined" &&
            typeof data.views === "number"
          ) {
            sessionStorage.setItem(key, "1");
          }
          if (!cancelled) {
            setViews(typeof data.views === "number" ? data.views : null);
          }
          return;
        }

        const res = await fetch(
          `/api/essay-view?id=${encodeURIComponent(essayId)}`,
        );
        const data = (await res.json()) as { views?: number | null };
        if (!cancelled) {
          setViews(typeof data.views === "number" ? data.views : null);
        }
      } catch {
        if (!cancelled) setViews(null);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [essayId]);

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const blueskyText = encodeURIComponent(`${title} ${shareUrl}`);

  const xHref = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
  const blueskyHref = `https://bsky.app/intent/compose?text=${blueskyText}`;
  const linkedInHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const btnClass =
    "inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-3 text-sm text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:border-white/10 dark:bg-white/[0.03] dark:text-neutral-300 dark:hover:bg-white/[0.06] dark:hover:text-white";

  return (
    <footer className="essay-page-footer mt-16 border-t border-neutral-200 pt-10 dark:border-white/10">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-500">
        Share
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href={xHref}
          target="_blank"
          rel="noopener noreferrer"
          className={btnClass}
        >
          X
        </a>
        <a
          href={blueskyHref}
          target="_blank"
          rel="noopener noreferrer"
          className={btnClass}
        >
          Bluesky
        </a>
        <a
          href={linkedInHref}
          target="_blank"
          rel="noopener noreferrer"
          className={btnClass}
        >
          LinkedIn
        </a>
        <button type="button" onClick={() => void copyLink()} className={btnClass}>
          {copied ? "Copied" : "Copy link"}
        </button>
      </div>

      {typeof views === "number" && (
        <p className="mt-8 text-sm text-neutral-500 dark:text-neutral-500">
          {views.toLocaleString()} {views === 1 ? "view" : "views"}
        </p>
      )}
    </footer>
  );
}
