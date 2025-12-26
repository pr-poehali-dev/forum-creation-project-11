export type UserRole = 'user' | 'moderator' | 'admin';

export interface User {
  id: string;
  name: string;
  avatar: string;
  role: UserRole;
  coins: number;
  status: string;
  profileBackground: string;
  profileBorder: string;
  cards: Card[];
  achievements: Achievement[];
  isBlocked: boolean;
}

export interface Card {
  id: string;
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  image: string;
  category: string;
  description: string;
}

export interface ProfileBackground {
  id: string;
  name: string;
  gradient: string;
  price: number;
  isExclusive: boolean;
}

export interface ProfileBorder {
  id: string;
  name: string;
  gradient: string;
  price: number;
  isExclusive: boolean;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  reward: number;
  completed: boolean;
}

export interface GiftBox {
  id: string;
  name: string;
  price: number;
  image: string;
  rewards: BoxReward[];
}

export interface BoxReward {
  type: 'coins' | 'card' | 'background' | 'border';
  value: string | number;
  chance: number;
}

export interface PrivateMessage {
  id: string;
  fromUserId: string;
  toUserId: string;
  text?: string;
  voiceUrl?: string;
  timestamp: string;
  isRead: boolean;
}

export interface Achievement {
  id: number;
  name: string;
  icon: string;
  unlocked: boolean;
  description: string;
}
