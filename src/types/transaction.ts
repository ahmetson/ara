import type { ReceiverInfoProps } from '@/components/maintainer/ReceiverInfo';

// Re-export ReceiverInfoProps for convenience
export type { ReceiverInfoProps };

export interface Transaction {
  _id?: string;
  initiateTxId?: string;
  hyperpayTxId?: string;
  // User info who made the donation
  user: {
    nickname: string;
    icon?: string;
    sunshines: number;
    stars: number;
    isMaintainer?: boolean;
  };
  // Optional cascade information
  cascadeLevel?: number;
  receivers?: ReceiverInfoProps[];
  maintainer?: {
    nickname: string;
    icon?: string;
    sunshines: number;
    stars: number;
  };
  // Additional fields for display
  blockchainTx?: string;
  receipt?: string;
  amount: number;
  date: number;
  memo?: string;
}

