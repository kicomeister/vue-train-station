<template>
  <div id="app">
    <div class="background"></div>
    <div class="routes">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;800;900&display=swap');

  :root {
    --action: #D13833;
    --action2: #E35252;
    --action2light: #E5B4B41A;
    --action3: #981C18;
    --dark: #292929;
    --dark2: #333333;
    --dark3: #6F6F6F;
    --light: #FFFFFF;
    --grey1: #F5F5F5;
    --grey2: #D5D5D5;

    --content-width: 900px;
  }

  html, body {
    color: var(--dark);
    background: var(--grey1);
    font-family: 'Raleway', Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    min-height: 100vh;
  }

  * {
    box-sizing: border-box;
  }

  #app {
    min-height: 100vh;
    position: relative;
  }

  .background {
    background: url("assets/swiss-federal-railways.png") center center / cover;
    width: 100%;
    height: 768px;
    height: 0;
    padding-top: 40%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }

  .routes {
    position: relative;
    z-index: 2;
  }

  .background:before, .background:after {
    content: '';
    position: absolute;
    width: 100%;
    left: 0;
  }

  .background:before {
    top: 0;
    bottom: 0;
    background: var(--dark2);
    opacity: 0.87;
  }

  .background:after {
    top: 100%;
    height: 91px;
    background: var(--action);
  }

</style>
