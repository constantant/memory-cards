<script lang='ts'>
  import { base } from '$app/paths';
  import type { SvelteComponentTyped } from 'svelte';

  type Themes = 'light' | 'dark';
  let themeName: Themes = 'light';

  type ThemeComponent = SvelteComponentTyped<{ themeClass: string; }>
  type ThemeClass = { new(...args: unknown[]): ThemeComponent; }

  type ThemeList = { [themeName: Themes]: () => Promise<ThemeClass>; };
  const themes: ThemeList = {
    light: async (): Promise<ThemeClass> => (await import('../lib/themes/light.svelte')).default,
    dark: async (): Promise<ThemeClass> => (await import('../lib/themes/dark.svelte')).default
  };
  const changeTheme = () => themeName = themeName === 'dark' ? 'light' : 'dark';

  let theme: ThemeClass;
  let themeClass: string;
  $: themes[themeName]().then(t => theme = t);
</script>

<style lang='scss'>
  .mc-app {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    display: grid;
    grid-auto-rows: auto 1fr;
  }

  .mc-nav {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr auto;
    padding: 1rem;
  }

  .mc-nav-themes {
  }

  .mc-content {
    overflow: auto;
  }
</style>

<svelte:head>
  <link rel='icon' href='{base}/favicon.ico' />
</svelte:head>

<svelte:component this={theme} bind:themeClass={themeClass} />

<div class='mc-app {themeClass}'>
  <div class='mc-nav'>
    <nav>
      <a href='{base}/'>Home</a>
      <a href='{base}/add-card'>Add card</a>
    </nav>
    <button on:click={changeTheme} class='mc-nav-themes'>Theme: {themeName}</button>
  </div>
  <div class='mc-content'>
    <slot></slot>
  </div>
</div>
