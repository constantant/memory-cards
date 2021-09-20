import type { Load } from '@sveltejs/kit';
import { CardsStore } from './datastore';
import type { Id } from './datastore/types';

export const load: Load = async ({ page }) => {
  const card = await CardsStore.get(
    Number(page.params.card)
  );
  return {
    props: { card }
  };
};

export const nav = async (cardId: Id) => {};
