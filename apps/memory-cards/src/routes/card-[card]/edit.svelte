<script lang='ts' context='module'>
  export { load } from '../../lib/load-card';
</script>

<script lang='ts'>
  import CardForm from '../_card-form.svelte';
  import type { Card } from '../../lib/datastore/types';

  export let card: Card;
</script>

<h2>Edit card</h2>

<CardForm initialValues='{card}' />
