<template>
  <div id="background">
    <sui-container>
      <sui-grid
        :columns="2">
          <sui-grid-column
            class="full-height">
              <div :style="styles.flex">
                <div :style="styles.form">
                  <div :style="styles.header">
                    <h1>Have a retrospective meeting with ease</h1>
                    <p :style="styles.caption">Having retrospective meetings just got easier.
                      Now, you can create a retrospective session and share
                    the link with your team members.</p>
                  </div>
                  <sui-grid
                    :columns="2">
                    <sui-grid-row>
                      <sui-grid-column
                        stretched
                       :width="6">
                        <sui-button
                          icon="table"
                          color="violet"
                          :style="styles.button"
                          :loading="loading"
                          :disabled="loading"
                          @click="createNew"
                          icon-position="left"
                          content="Create New Retro"
                        />
                      </sui-grid-column>
                      <sui-grid-column
                        stretched
                        :width="9">
                        <sui-form @submit.prevent="joinSession">
                          <sui-form-field>
                            <sui-input
                              v-model.trim="roomCodeOrLink"
                              :loading="formSubmitting"
                              :disabled="formSubmitting"
                              icon-position="left"
                              icon="keyboard outline icon"
                              placeholder="Enter room code or link"
                            />
                          </sui-form-field>
                        </sui-form>
                      </sui-grid-column>
                    </sui-grid-row>
                  </sui-grid>
                  <sui-divider />
                    <transition name="fade">
                          <sui-message v-show="error" error>
                            {{ errorMessage }}
                          </sui-message>
                        </transition>
                </div>
              </div>
          </sui-grid-column>
          <sui-grid-column>
            <div :style="styles.flex">
              <div>
                <img class="ui image big" src="../assets/board.svg" />
              </div>
            </div>
          </sui-grid-column>
      </sui-grid>
    </sui-container>
  </div>
</template>

<script>
import client from '../api/client';
import utils from '../utils';

export default {
  name: 'App',
  data() {
    return {
      loading: false,
      roomCodeOrLink: '',
      errorMessage: '',
      formSubmitting: false,
      styles: {
        flex: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100%',
        },
        form: {
          minWidth: '100%',
        },
        header: {
          marginBottom: '2em',
        },
        caption: {
          marginRight: '5em',
          marginBottom: '3em',
        },
      },
    };
  },
  methods: {
    async createNew() {
      this.loading = true;

      const session = await client.createNewRetro();

      if (session) {
        this.$router.push({
          name: 'session',
          params: {
            id: session.id,
          },
        });
      }
      this.loading = false;
    },
    async joinSession() {
      this.formSubmitting = true;

      if (this.roomCodeOrLink) {
        let code = this.roomCodeOrLink;
        const isCode = utils.isCode(this.roomCodeOrLink);
        const isUrl = utils.isValidLink(this.roomCodeOrLink);

        if (!isCode && !isUrl) {
          // run some sort of alert
          this.roomCodeOrLink = '';
          this.alert('Invalid code or room link');
        } else {
          if (isUrl) {
            code = utils.getCodeFromLink(this.roomCodeOrLink);
          }
          this.$router.push({
            name: 'session',
            params: {
              id: code,
            },
          });
        }
      }

      this.formSubmitting = false;
    },
    alert(message) {
      this.errorMessage = message;

      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
    },
  },
  computed: {
    error() {
      return !!this.errorMessage;
    },
  },
};
</script>

<style scoped>
  #background {
    height: 100vh;
    margin: 1em 0;
  }

  .full-height {
    height: 100vh;
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
