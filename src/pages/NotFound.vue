<template>
  <div :style="styles.container">
    <div>
      <img
        class="ui image large"
        src="../assets/not_found.svg" />
      <h2
        color="grey"
        is="sui-header"
        :style="styles.text">
        Awwww... Did you miss your way?
      </h2>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      styles: {
        container: {
          display: 'flex',
          minHeight: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        },
        text: {
          textAlign: 'center',
        },
      },
    };
  },
};
</script>
