<script lang='ts'>
  import { browser } from '$app/env';
  import { base } from '$app/paths';
  import { goto } from '$app/navigation';

  import { createForm } from 'svelte-forms-lib';

  import type { Card } from '../lib/datastore/types';
  import { create, update } from '../lib/store';

  export let initialValues: Card = {
    phrase: '',
    translate: '',
    example: ''
  };
  const validate = (card: Card) => {
    const { phrase, translate } = card;
    let errors: { [field: string]: string; } = {};
    if (phrase === '') {
      errors.phrase = 'phase field is required';
    }
    if (translate === '') {
      errors.translate = 'translate field is required';
    }
    return errors;
  };
  const onSubmit = (card: Card): void => {
    (
      card?.id
        ? update(card)
        : create(card)
    ).then((cardId: number) => {
      goto(`${base}/card-${cardId}`);
    });
  };
  const { form, errors, handleSubmit, handleChange } = createForm({
    initialValues, validate, onSubmit
  });
  let isEdit: boolean;
  $: isEdit = !!initialValues?.id;

  let isLoading: boolean;
  $: isLoading = !browser;
</script>

<style lang='scss'>
  .mc-card-form {
    display: grid;
    grid-gap: 1rem;
    padding: 1rem;
  }

  .mc-card-field {
    display: grid;
  }

  .mc-card-error {
    font-size: 0.8rem
  }

  .mc-card-submit {
    max-width: 200px;
    padding: 0.5rem;
    cursor: pointer;
  }
</style>

{#if isLoading}
  Loading...
{:else}
  <form class='mc-card-form' on:submit={handleSubmit}>
    <div class='mc-card-field'>
      <label for='add-form-phrase'>phrase</label>
      <input
        type='text'
        id='add-form-phrase'
        name='phrase'
        bind:value={$form.phrase}
        on:change={handleChange}
      >
      {#if $errors.phrase}
        <span class='mc-card-error'>{$errors.phrase}</span>
      {/if}
    </div>
    <div class='mc-card-field'>
      <label for='add-form-translate'>translate</label>
      <input
        type='text'
        id='add-form-translate'
        name='translate'
        bind:value={$form.translate}
        on:change={handleChange}
      >
      {#if $errors.translate}
        <span class='mc-card-error'>{$errors.translate}</span>
      {/if}
    </div>
    <div class='mc-card-field'>
      <label for='add-form-example'>example</label>
      <input
        type='text'
        id='add-form-example'
        name='example'
        bind:value={$form.example}
        on:change={handleChange}
      >
    </div>
    <button class='mc-card-submit' type='submit'>
      {#if isEdit}Edit card{:else}Add card{/if}
    </button>
  </form>
{/if}
