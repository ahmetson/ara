export enum IssueTag {
    IMPROVEMENT = 'improvement',
    FEATURE = 'feature',
    BUG = 'bug',
    ENHANCEMENT = 'enhancement',
    WISH = 'wish',
    CUSTOM = 'custom'
}

export type IssueStatType = 'upvote' | 'downvote' | 'chat' | 'voting-power' | 'follower' | 'money' | 'persona';

// Client-safe version of IssueStat (serializable for Astro actions)
export interface IssueStat {
    type: IssueStatType;
    hint: string;
    filled?: boolean;
    children: string | number;
}

// Client-safe version of IssueUser (serializable for Astro actions)
export interface IssueUser {
    username: string;
    starshineAmount: number;
    transactionDate: number; // Unix timestamp
}

export interface Issue {
    _id?: string;
    galaxy: string;
    uri: string;
    title: string;
    description: string;
    tags: IssueTag[];
    maintainer: string;
    listHistory?: string[]; // Track issue location history (e.g., ['patcher'])
    stats?: {
        [key in IssueStatType]?: IssueStat;
    };
    createdTime?: number; // Unix timestamp
    sunshines: number;
    users: IssueUser[];
    author?: string; // ID of the user who created the issue
    contributor?: string; // ID of the user assigned as contributor
}

export enum IssueTabKey {
    SHINING = 'shining',
    PUBLIC = 'public',
    INTERESTING = 'interesting',
    BORING = 'boring',
    CLOSED = 'closed',
}

export const ISSUE_TAB_TITLES: Record<IssueTabKey, string> = {
    [IssueTabKey.SHINING]: 'Shining Issues',
    [IssueTabKey.PUBLIC]: 'Public Backlog',
    [IssueTabKey.INTERESTING]: 'Interesting Issues',
    [IssueTabKey.BORING]: 'Boring Issues',
    [IssueTabKey.CLOSED]: 'Closed Issues',
}

export const ISSUE_EVENT_TYPES = {
    ISSUE_CREATED: 'issue-created',
    ISSUE_UPDATE: 'issue-update',
    ISSUE_UNPATCHED: 'issue-unpatched',
    ISSUES_TAB_CHANGED: 'patchable-tab-changed',
} as const

/**
 * Check if an issue is patchable (has both contributor and maintainer)
 */
export function isPatchable(issue: Issue): boolean {
    return Boolean(issue.contributor && issue.maintainer);
}

