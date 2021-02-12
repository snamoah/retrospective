<template>
  <div id="background">
    <sui-container>
      <sui-grid
        :columns="2">
          <sui-grid-column
            class="full-height">
              <sui-grid
                :columns="2">
                <sui-grid-row>
                <sui-grid-column
                  stretched
                  :width="6">
                      <sui-button
                        icon="table"
                        color="violet"
                        @click="createNew"
                        icon-position="left"
                        content="Create New Retro" />
                </sui-grid-column>
                  <sui-grid-column
                    stretched
                    :width="8">
                      <sui-input
                        placeholder="Enter room code or link"
                        icon="keyboard outline icon"
                        icon-position="left"
                      />
                  </sui-grid-column>
                </sui-grid-row>
              </sui-grid>
              <sui-divider />
          </sui-grid-column>
          <sui-grid-column>
            <img class="ui image big" src="../assets/board.svg" />
          </sui-grid-column>
      </sui-grid>
    </sui-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    createNew() {
      this.$router.push('/board');
    },
  },
};
</script>

<style scoped>
  #background {
    height: 100vh;
    /* background: #483482; */
    margin: 1em 0;
  }

  .flex {
    display: flex;
    background: #572f21;
  }

  .full-height {
    height: 100vh;
  }
</style>
