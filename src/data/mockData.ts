import { Card, ProfileBackground, ProfileBorder, Quest, GiftBox } from '@/types/forum';

export const mockCards: Card[] = [
  {
    id: 'c1',
    name: 'Крипто Король',
    rarity: 'legendary',
    image: '💎',
    category: 'crypto',
    description: 'Легендарная карта крипто-эксперта',
  },
  {
    id: 'c2',
    name: 'Блогер Звезда',
    rarity: 'epic',
    image: '⭐',
    category: 'bloggers',
    description: 'Эпическая карта популярного блогера',
  },
  {
    id: 'c3',
    name: 'Финансист',
    rarity: 'rare',
    image: '💰',
    category: 'finance',
    description: 'Редкая карта финансового аналитика',
  },
  {
    id: 'c4',
    name: 'Репортер',
    rarity: 'common',
    image: '📰',
    category: 'news',
    description: 'Обычная карта репортера',
  },
];

export const mockBackgrounds: ProfileBackground[] = [
  { id: 'bg1', name: 'Космос', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', price: 0, isExclusive: false },
  { id: 'bg2', name: 'Закат', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', price: 100, isExclusive: false },
  { id: 'bg3', name: 'Океан', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', price: 150, isExclusive: false },
  { id: 'bg4', name: 'Галактика', gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', price: 300, isExclusive: true },
  { id: 'bg5', name: 'Огонь', gradient: 'linear-gradient(135deg, #ff9a56 0%, #ff2121 100%)', price: 250, isExclusive: true },
];

export const mockBorders: ProfileBorder[] = [
  { id: 'b1', name: 'Фиолетовый', gradient: 'linear-gradient(135deg, #8B5CF6, #D946EF)', price: 0, isExclusive: false },
  { id: 'b2', name: 'Золотой', gradient: 'linear-gradient(135deg, #F59E0B, #FBBF24)', price: 80, isExclusive: false },
  { id: 'b3', name: 'Неоновый', gradient: 'linear-gradient(135deg, #22D3EE, #A855F7)', price: 120, isExclusive: false },
  { id: 'b4', name: 'Радужный', gradient: 'linear-gradient(135deg, #667eea, #764ba2, #f093fb, #4facfe)', price: 200, isExclusive: true },
];

export const mockQuests: Quest[] = [
  { id: 'q1', title: 'Первый шаг', description: 'Создайте свой первый пост', reward: 50, completed: false },
  { id: 'q2', title: 'Активист', description: 'Напишите 10 комментариев', reward: 100, completed: false },
  { id: 'q3', title: 'Коллекционер', description: 'Соберите 5 карточек', reward: 200, completed: false },
  { id: 'q4', title: 'Социальный', description: 'Отправьте 20 личных сообщений', reward: 150, completed: false },
];

export const mockGiftBoxes: GiftBox[] = [
  {
    id: 'box1',
    name: 'Бронзовый бокс',
    price: 50,
    image: '📦',
    rewards: [
      { type: 'coins', value: 30, chance: 50 },
      { type: 'card', value: 'common', chance: 30 },
      { type: 'background', value: 'bg2', chance: 20 },
    ],
  },
  {
    id: 'box2',
    name: 'Серебряный бокс',
    price: 150,
    image: '🎁',
    rewards: [
      { type: 'coins', value: 100, chance: 40 },
      { type: 'card', value: 'rare', chance: 35 },
      { type: 'border', value: 'b2', chance: 25 },
    ],
  },
  {
    id: 'box3',
    name: 'Золотой бокс',
    price: 300,
    image: '🎀',
    rewards: [
      { type: 'coins', value: 250, chance: 30 },
      { type: 'card', value: 'epic', chance: 40 },
      { type: 'background', value: 'bg4', chance: 20 },
      { type: 'border', value: 'b4', chance: 10 },
    ],
  },
];

export const emojiList = ['😀', '😂', '😍', '🔥', '👍', '👎', '❤️', '🎉', '😎', '🤔', '👏', '🙌'];
