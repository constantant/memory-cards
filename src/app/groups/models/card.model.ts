export const cardEntityName = 'Card';

export interface Card {
  id: number;
  groupId: number;
  word: string;
  translated: string;
  examples: string;
}

export const cardSortComparer = (a: Card, b: Card) => a.word < b.word ? -1 : 1;
