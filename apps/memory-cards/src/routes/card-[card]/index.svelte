<script lang='ts' context='module'>
  export { load } from '../../lib/load-card';
</script>

<script lang='ts'>
  import { base } from '$app/paths';
  import type { Card } from '../../lib/datastore/types';
  import { cards } from '../../lib/store';

  import type { Observable } from 'rxjs';
  import { Subject, switchMap } from 'rxjs';
  import { map } from 'rxjs/operators';

  export let card: Card;

  const currentCard: Subject<Card> = new Subject<Card>();
  const meta: Observable<[Card[], number, number]> = currentCard.pipe(
    switchMap((card: Card) => cards.pipe(
      map(cards => [
        cards,
        cards.length,
        cards.findIndex(({ id }) => id === card.id)
      ])
    ))
  );
  const prevCardId: Observable<Card> = meta.pipe(
    map(([cards, len, index]) => cards[index === 0 ? len - 1 : index - 1]),
    map(({ id }) => id)
  );
  const nextCardId: Observable<Card> = meta.pipe(
    map(([cards, len, index]) => cards[index === len - 1 ? 0 : index + 1]),
    map(({ id }) => id)
  );

  $: card && currentCard.next(card);

</script>

{#if card}
  <div>
    <a href='{base}/card-{$prevCardId}'>Prev</a>
    <a href='{base}/card-{$nextCardId}'>Next</a>
  </div>

  <h1>{card.phrase}</h1>
  <h3>{card.translate}</h3>
  {#if (card.example)}
    <p>{card.example}</p>
  {/if}
  <div>
    <a href='{base}/card-{card.id}/edit'>Edit card</a>
  </div>
{/if}
