<template>
  <div class="background">
    <div class="header">
      <sui-menu text>
        <sui-menu-item header>
          <sui-icon
            name="table"
            color="violet"
            size="large" />
        </sui-menu-item>
        <sui-menu-item>
          <sui-input transparent placeholder="Retrospective Title" />
        </sui-menu-item>
      </sui-menu>
    </div>
    <sui-grid>
      <sui-grid-row>
      </sui-grid-row>
    </sui-grid>
  </div>
</template>

<script>
export default {

};
</script>

<style scoped>
  .background {
    height: 100vh;
    margin: 1em 0;
  }

  .header {
    margin-left: 2em;
  }
</style>
