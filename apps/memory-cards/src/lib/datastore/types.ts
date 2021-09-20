export type Id = number;

export interface Card {
  id?: Id;
  phrase: string;
  translate: string;
  example?: string;
}

export interface Topic {
  id?: Id;
  name: string;
  description?: string;
}

export interface CardsTopics {
  cardId: Id;
  topicId: Id;
}
