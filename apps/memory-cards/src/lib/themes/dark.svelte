<script lang='ts'>
  export const themeClass = 'mc-theme-dark';
</script>

<style lang='scss'>
  @import "../style";

  $theme-dark: (color: #111, contrast: #eee);
  @include theme('dark', $theme-dark);
</style>

<slot></slot>
