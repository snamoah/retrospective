<template>
  <transition>
    <div class="container">
      <sui-segment
        compact
        inverted
        raised
        emphasis="secondary"
        color="orange">
          <p>This is a test</p>
      </sui-segment>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      // styles: {
      //   workarea: {
      //     backgroundColor: 'green',
      //     height: '100vh',
      //   },
      // },
    };
  },
};
</script>

<style scoped>
  .container {
    position: relative;
    padding: 0.5em;
  }

  .textarea {
    border-radius: 0.5em;
    border: none;
    resize: none;
    width: 100%;
    min-height: 100%;
    outline: none;
  }
</style>
