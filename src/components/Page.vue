<template>
  <div class="page">
    <header>
      <h1>{{title}}</h1>
      <h2>{{description}}</h2>
    </header>
    <div class="content">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Page',
  props: {
    title: {
      type: String
    },
    description: {
      type: String
    }
  }
}
</script>

<style scoped>
  .page {
    padding-bottom: 100px;
  }

  header {
    margin: 0 auto;
    padding: 120px 0 102px;
    text-align: center;
    width: var(--content-width);
    max-width: 100%;
  }

  h1, h2 {
    color: var(--light);
    text-transform: uppercase;
    margin: 0;
  }

  h1 {
    font-size: 64px;
    font-weight: 900;
    letter-spacing: 1.28px;
    line-height: 75px;
    margin: 0 0 36px;
  }

  h2 {
    font-size: 20px;
    font-weight: 800;
    letter-spacing: 1.2px;
    line-height: 31px;
  }

  .content {
    background: var(--light);
    margin: 0 auto;
    padding: 50px 45px;
    width: var(--content-width);
    max-width: 100%;
  }
</style>
