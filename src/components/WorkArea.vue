<template>
  <sui-grid
        :columns="3">
        <sui-grid-row>
          <sui-grid-column>
            <div class="workarea">
              <note v-for="note in positiveNotes" :key="note.id" />
            </div>
          </sui-grid-column>
          <sui-grid-column>
            <div class="workarea">
              <note v-for="note in negativeNotes" :key="note.id" />
            </div>
          </sui-grid-column>
          <sui-grid-column>
            <div class="workarea">
              <note v-for="note in improvementNotes" :key="note.id" />
            </div>
          </sui-grid-column>
        </sui-grid-row>
  </sui-grid>
</template>

<script>
import Note from './Note.vue';
import { retros } from '../api/client';

export default {
  components: { Note },
  data() {
    return {
      notes: [],
    };
  },
  props: ['retroId'],
  methods: {
    getRetro() {
      if (this.retroId) {
        retros.doc(this.retroId)
          .onSnapshot((doc) => {
            const retro = doc.data();
            this.notes = retro.notes;
          });
      }
    },

    filterNotesByType(type) {
      return this.notes ? this.notes.filter((note) => note.type === type) : [];
    },
  },
  created() {
    this.getRetro();
  },
  watch: {
    retroId() {
      this.getRetro();
    },
  },
  computed: {
    positiveNotes() {
      return this.filterNotesByType('positive');
    },
    negativeNotes() {
      return this.filterNotesByType('negative');
    },
    improvementNotes() {
      return this.filterNotesByType('improvement');
    },
  },
};
</script>

<style scoped>
  .workarea {
    height: 100%;
    position: 'fixed';
    top: 0;
  }
</style>
