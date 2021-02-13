<template>
  <transition>
    <div class="container" v-if="note">
      <sui-card
        class="raised"
        color="orange">
          <sui-card-content>
            <sui-card-meta slot="right">
              <sui-icon
                link
                name="close"
                @click.prevent="deleteNote" />
              <!-- <sui-icon name="close" /> -->
            </sui-card-meta>
          </sui-card-content>
          <sui-card-content>
            <p>{{ note.text }}</p>
          </sui-card-content>
      </sui-card>
    </div>
  </transition>
</template>

<script>
import client from '../api/client';

export default {
  props: ['retroId', 'note'],
  methods: {
    async deleteNote() {
      await client.deleteNote(this.retroId, this.note);
    },
  },
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
