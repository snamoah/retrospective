<template>
    <div
      class="container"
      @mouseenter="showCloseButton"
      @mouseleave="hideCloseButton"
      v-if="note">
      <sui-card
        :class="classAttr">
          <transition name="close">
            <div
              v-show="close"
              class="close-button">
              <sui-button size="tiny" circular icon="close" @click.prevent="deleteNote" />
            </div>
          </transition>
          <!-- <span>
              <sui-icon
                link
                name="close"
                @click.prevent="deleteNote" />
          </span> -->
          <sui-card-content>
            <textarea
              ref="textarea"
              @focus="showCloseButton"
              class="textarea"
              @mouseleave="saveNote"
              v-model="comment" />
          </sui-card-content>
      </sui-card>
    </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';
import autosize from 'autosize';
import client from '../api/client';
import bus from '../utils/bus';

const colorFromType = {
  positive: 'teal',
  negative: 'orange',
  improvement: 'violet',
};

export default {
  data() {
    return {
      close: false,
      comment: this.note.text,
    };
  },
  props: ['retroId', 'note'],
  computed: {
    classAttr() {
      return ['raised', colorFromType[this.note.type]];
    },
  },
  methods: {
    showCloseButton() {
      this.close = true;
    },

    hideCloseButton() {
      this.close = false;
    },

    async deleteNote() {
      await client.deleteNote(this.retroId, this.note);
    },

    async saveNote() {
      if (this.comment !== this.note.text) {
        const noteToSave = {
          ...this.note,
          text: this.comment,
        };
        bus.$emit('save-note', noteToSave);
      }

      // await client.saveNote(this.retroId, notToSave);
    },
  },
  mounted() {
    autosize(this.$refs.textarea);
  },
  directives: {
    ClickOutside,
  },
};
</script>

<style scoped>
  .container {
    position: relative;
    padding: 0.5em;
    margin: 1em;
  }

  .textarea {
    border-radius: 0.5em;
    border: none;
    resize: none;
    width: 100%;
    min-height: 100%;
    outline: none;
  }

  .close-button {
    position: absolute;
    top: -1em;
    right: -1em;
  }

  .close-enter-active,
  .close-leave-active {
    transition: opacity 0.2s ease;
  }

  .close-enter-from,
  .close-leave-to {
    opacity: 0;
  }
</style>
