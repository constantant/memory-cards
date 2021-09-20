<script lang='ts' context='module'>
  import { cards, remove } from '../lib/store';
</script>

<script lang='ts'>
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Memory Cards</title>
</svelte:head>

<ul class='mc-card-list'>
  {#each ($cards || []) as { id, phrase }}
    <li class='mc-card-item'>
      <a href='{base}/card-{id}'>{phrase}</a>
      <a href='{base}/card-{id}/edit'>edit</a>
      <button on:click={remove(id)}>x</button>
    </li>
  {:else}
    <p>no cards</p>
  {/each}
</ul>
