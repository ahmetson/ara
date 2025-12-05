export interface Transaction {
  id: string;
  date: string;
  comment: string;
  reply: string;
  given: number;
  vp: number;
  issues: number;
  transactionId: string;
  rating: number;
  ratingLeft: number;
  user: {
    name: string;
    avatar: string;
  };
}

