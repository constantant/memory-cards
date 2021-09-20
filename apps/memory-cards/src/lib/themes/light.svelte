<script lang='ts'>
  export const themeClass = 'mc-theme-light';
</script>

<style lang='scss'>
  @import "../style";

  $theme-bright: (color: white, contrast: black);
  @include theme('light', $theme-bright);
</style>

<slot></slot>
