<template>
  <transition>
    <div class="container">
      <sui-card
        class="raised"
        color="orange">
          <sui-card-content>
            <sui-card-meta slot="right">
              <sui-icon name="close" />
            </sui-card-meta>
          </sui-card-content>
          <sui-card-content>
            <p>This is a test</p>
          </sui-card-content>
      </sui-card>
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
