export enum AppTab {
  HOME = 'HOME',
  TRANSACTIONS = 'TRANSACTIONS',
  ASSISTANT = 'ASSISTANT',
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface TokenBalance {
  symbol: string;
  balance: string;
  name: string;
}
