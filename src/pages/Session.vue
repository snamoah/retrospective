<template>
  <transition name="fade">
    <div v-show="!loading" class="background">
      <div class="header">
        <sui-menu text>
          <sui-menu-item header>
            <sui-icon
              name="table"
              color="violet"
              size="large" />
          </sui-menu-item>
          <sui-menu-item>
            <sui-input 
              transparent
              v-model="title"
              placeholder="Retrospective Title" />
          </sui-menu-item>

          <sui-menu-item>
            <div>
              <sui-button
                color="teal"
                @click="createNote('positive')"
                icon="smile outline"
                label-position="left"
                content="Positive Note" />
              <sui-button
                color="orange"
                icon="frown outline"
                label-position="left"
                @click="createNote('negative')"
                content="Negative Note" />
              <sui-button
                color="violet"
                icon="meh outline"
                label-position="left"
                @click="createNote('improvement')"
                content="Improvement Note" />
              </div>
          </sui-menu-item>

          <sui-menu-menu position="right">
            <sui-menu-item>
              <avatars :retro-id="retroId" />
            </sui-menu-item>
          </sui-menu-menu>
        </sui-menu>
      </div>
      <work-area :retro-id="retroId" />
    </div>
  </transition>
</template>

<script>
import client, { retros } from '../api/client';
import WorkArea from '../components/WorkArea.vue';
import Avatars from '../components/Avatars.vue';

const getMetaData = (type) => {
  switch (type) {
    case 'improvement': {
      return {
        text: 'We can do better at...',
      };
    }
    case 'negative': {
      return {
        text: 'For me, what did\'t go well is...',
      };
    }
    case 'positive': {
      return {
        text: 'For me, what went well is...',
      };
    }
    default: {
      return {
        text: '',
      };
    }
  }
};

export default {
  components: {
    WorkArea,
    Avatars,
  },
  data() {
    return {
      title: '',
      loading: true,
      retro: null,
      session: null,

    };
  },
  computed: {
    retroId() {
      return this.retro && this.retro.id;
    },
  },
  methods: {
    async getRoom() {
      const retroId = this.$route.params.id;
      const retro = await client.getRetro(retroId);

      if (!retro) {
        this.$router.push({ name: 'notFound' });
        return;
      }

      this.retro = retro;
    },
    async startSession() {
      if (!this.session) {
        const session = await client.createSession(this.retro.id);
        this.session = session.id;
      }
    },

    async endSession() {
      if (this.session && this.retro) {
        await client.closeSession(this.session, this.retro.id);
      }
    },

    async createNote(type) {
      const note = {
        type,
        ...getMetaData(type),
      };

      await client.createNote(this.retro.id, note);
    },
  },
  created() {
    window.addEventListener('beforeunload', this.endSession);
    this.getRoom()
      .then(() => {
        if (this.retro) {
          return this.startSession();
        }
        return Promise.resolve();
      }).then(() => {
        this.loading = false;
      });
  },
  mounted() {
    if (this.retro && this.retro.id) {
      retros.doc(this.retro.id)
        .onSnapshot((doc) => {
          this.retro = {
            id: doc.id,
            ...doc.data(),
          };
        });
    }
  },
  beforeRouteLeave(to, from, next) {
    this.endSession().then(() => {
      window.removeEventListener('beforeunload', this.endSession);
      next();
    });
  },
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

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
