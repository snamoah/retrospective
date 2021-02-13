<template>
  <div
    class="avatar-container">
    <div
      class="avatar-image"
      v-for="(link, index) in avatarLinks"
      :key="index"
    >
      <sui-image
        circular
        size="mini"
        :src="link" />
    </div>
    <div
      v-if="restCount > 0"
      class="avatar-image">
      <div class="avatar-additional">
        <span>+ {{ restCount }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { retros } from '../api/client';

const MAX_SHOW = 2;

export default {
  data() {
    return {
      users: [],
    };
  },
  props: ['retroId'],
  methods: {
    getRetro() {
      if (this.retroId) {
        retros.doc(this.retroId)
          .onSnapshot((doc) => {
            const retro = doc.data();
            this.users = retro.users;
          });
      }
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
    avatarLinks() {
      const numberOfAvatars = (this.usersCount > MAX_SHOW)
        ? MAX_SHOW
        : this.usersCount;
      return Array.from({ length: numberOfAvatars })
        .map((id) => `https://www.gravatar.com/avatar/${id}?d=retro&s=40`);
    },
    usersCount() {
      return this.users ? this.users.length : 0;
    },
    restCount() {
      return this.users && (this.users.length > MAX_SHOW)
        ? this.users.length - MAX_SHOW
        : 0;
    },
  },
};
</script>

<style scoped>
  .avatar-container {
    display: flex;
    margin-right: 2em;
  }

  .avatar-additional {
    border-radius: 50%;
    height: 37px;
    width: 37px;
    background-color: #dadada;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.8em;
  }

  .avatar-image {
    border-width: 0.3em;
    border-style: solid;
    border-color: white;
    border-radius: 50%;
  }

  .avatar-image + .avatar-image {
    margin-left: -1.5em;
    z-index: 8000;
  }
</style>
