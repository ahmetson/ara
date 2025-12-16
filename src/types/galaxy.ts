export interface Galaxy {
    _id?: string
    maintainer: string
    projectLink: string; // Reference to Project ID
    name: string;
    description: string;
    stars: number;
    sunshines: number;
    users: number;
    donationAmount: number;
    x: number;
    y: number;
    tags?: string[];
    blockchainId?: string; // 0x EVM address
    blockchainTx?: string;
}

export const GALAXY_ZOOM_EVENTS = {
    ZOOM_TO: 'galaxy-zoom-to',
    ZOOM_CHANGE: 'galaxy-zoom-change',
} as const

