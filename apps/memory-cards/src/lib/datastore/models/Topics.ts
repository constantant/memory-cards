import db from '../Connection';
import type { Id } from '../types';

const getAll = async () => db
  ? await db.topics.toArray()
  : Promise.resolve([]);

export default {
  getAll
};
