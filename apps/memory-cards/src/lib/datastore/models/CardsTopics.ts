import db from '../Connection';
import type { Id } from '../types';

const getCardIdsByTopicId = async (topicId: Id) => {
  const items = await (
    db
      ? db.cardsTopics.where({ topicId }).toArray()
      : Promise.resolve([])
  );
  return items.map(({ cardId }) => cardId);
};

const getTopicIdsByCardId = async (cardId: Id) => {
  const items = await (
    db
      ? db.cardsTopics.where({ cardId }).toArray()
      : Promise.resolve([])
  );
  return items.map(({ topicId }) => topicId);

};

export default {
  getCardIdsByTopicId,
  getTopicIdsByCardId
};
