<template>
  <!-- START ACTIVITIES -->
  <v-sheet elevation="4" max-width="100%" style="border-radius: 10px">
    <router-link :to="{ name: 'Account Monitoring' }">
      <v-subheader>Activities</v-subheader>
    </router-link>

    <v-slide-group v-model="model" class="pa-4" center-active show-arrows>
      <!-- STARTS INSTAGRAM -->
      <router-link :to="{ name: 'Account Monitoring' }">
        <v-slide-item v-slot="{ toggle }">
          <v-card
            class="ma-4"
            height="150"
            width="300"
            @click="toggle"
            color="primary"
            dark
          >
            <div class="ma-2">
              <v-card-title class="text-h5 mb-1">
                Instagram <v-spacer></v-spacer
                ><v-icon x-large>mdi-instagram</v-icon></v-card-title
              >
              <v-card-subtitle v-if="accountCount !== null">
                <div>
                  Total: {{ accountCount.instagram.total }} | Checkpoint:
                  {{ accountCount.instagram.checkpoint }}
                </div>
                <div>
                  Active: {{ accountCount.instagram.active }} | Not Active:
                  {{ accountCount.instagram.not_active }}
                </div>
              </v-card-subtitle>

              <v-card-subtitle v-if="accountCount == null"
                >Loading..
              </v-card-subtitle>
            </div>
          </v-card>
        </v-slide-item>
      </router-link>

      <!-- END INSTAGRAM -->

      <!-- STARTS FACEBOOK -->
      <router-link :to="{ name: 'Account Monitoring' }">
        <v-slide-item v-slot="{ toggle }">
          <v-card
            class="ma-4"
            height="150"
            width="300"
            @click="toggle"
            color="primary"
            dark
          >
            <div class="ma-2">
              <v-card-title class="text-h5 mb-1">
                Facebook <v-spacer></v-spacer
                ><v-icon x-large>mdi-facebook</v-icon></v-card-title
              >
              <v-card-subtitle v-if="accountCount !== null">
                <div>
                  Total: {{ accountCount.facebook.total }} | Checkpoint:
                  {{ accountCount.facebook.checkpoint }}
                </div>
                <div>
                  Active: {{ accountCount.facebook.active }} | Not Active:
                  {{ accountCount.facebook.not_active }}
                </div>
              </v-card-subtitle>

              <v-card-subtitle v-if="accountCount == null"
                >Loading..
              </v-card-subtitle>
            </div>
          </v-card>
        </v-slide-item>
      </router-link>

      <!-- END FACEBOOK -->

      <!-- STARTS WHATSAPP -->
      <router-link :to="{ name: 'Account Monitoring' }">
        <v-slide-item v-slot="{ toggle }">
          <v-card
            class="ma-4"
            height="150"
            width="300"
            @click="toggle"
            color="primary"
            dark
          >
            <div class="ma-2">
              <v-card-title class="text-h5 mb-1">
                Whatsapp <v-spacer></v-spacer
                ><v-icon x-large>mdi-whatsapp</v-icon></v-card-title
              >
              <v-card-subtitle v-if="accountCount !== null">
                <div>
                  Total: {{ accountCount.whatsapp.total }} | Checkpoint:
                  {{ accountCount.whatsapp.checkpoint }}
                </div>
                <div>
                  Active: {{ accountCount.whatsapp.active }} | Not Active:
                  {{ accountCount.whatsapp.not_active }}
                </div>
              </v-card-subtitle>

              <v-card-subtitle v-if="accountCount == null"
                >Loading..
              </v-card-subtitle>
            </div>
          </v-card>
        </v-slide-item>
      </router-link>
      <!-- END WHATSAPP -->

      <!-- STARTS TWITTER -->
      <router-link :to="{ name: 'Account Monitoring' }">
        <v-slide-item v-slot="{ toggle }">
          <v-card
            class="ma-4"
            height="150"
            width="300"
            @click="toggle"
            color="primary"
            dark
          >
            <div class="ma-2">
              <v-card-title class="text-h5 mb-1">
                Twitter <v-spacer></v-spacer
                ><v-icon x-large>mdi-twitter</v-icon></v-card-title
              >
              <v-card-subtitle v-if="accountCount !== null">
                <div>
                  Total: {{ accountCount.twitter.total }} | Checkpoint:
                  {{ accountCount.twitter.checkpoint }}
                </div>
                <div>
                  Active: {{ accountCount.twitter.active }} | Not Active:
                  {{ accountCount.twitter.not_active }}
                </div>
              </v-card-subtitle>

              <v-card-subtitle v-if="accountCount == null"
                >Loading..
              </v-card-subtitle>
            </div>
          </v-card>
        </v-slide-item>
      </router-link>

      <!-- END TWITTER -->

      <!-- STARTS TIKTOK -->
      <!-- <router-link :to="{ name: 'Account Monitoring' }">
        <v-slide-item v-slot="{ toggle }">
          <v-card
            class="ma-4"
            height="150"
            width="300"
            @click="toggle"
            color="primary"
            dark
          >
            <div class="ma-2">
              <v-card-title class="text-h5 mb-1">
                Tiktok <v-spacer></v-spacer
                ><img
                  src="@/assets/img/tiktok.svg"
                  alt=""
                  style="width: 50px; height: 50px"
              /></v-card-title>
              <v-card-subtitle v-if="accountCount !== null">
                <div>
                  Total: {{ accountCount.tiktok.total }} | Checkpoint:
                  {{ accountCount.tiktok.checkpoint }}
                </div>
                <div>
                  Active: {{ accountCount.tiktok.active }} | Not Active:
                  {{ accountCount.tiktok.not_active }}
                </div>
              </v-card-subtitle>

              <v-card-subtitle v-if="accountCount == null"
                >Loading..
              </v-card-subtitle>
            </div>
          </v-card>
        </v-slide-item>
      </router-link> -->
      <!-- END TIKTOK -->

      <!-- STARTS THREADS -->
      <!-- <router-link :to="{ name: 'Account Monitoring' }">
        <v-slide-item v-slot="{ toggle }">
          <v-card
            class="ma-4"
            height="150"
            width="300"
            @click="toggle"
            color="primary"
            dark
          >
            <div class="ma-2">
              <v-card-title class="text-h5 mb-1">
                Threads <v-spacer></v-spacer
                ><img
                  src="@/assets/img/threads.svg"
                  alt=""
                  style="width: 50px; height: 50px"
              /></v-card-title>
              <v-card-subtitle v-if="accountCount !== null">
                <div>
                  Total: {{ accountCount.threads.total }} | Checkpoint:
                  {{ accountCount.threads.checkpoint }}
                </div>
                <div>
                  Active: {{ accountCount.threads.active }} | Not Active:
                  {{ accountCount.threads.not_active }}
                </div>
              </v-card-subtitle>

              <v-card-subtitle v-if="accountCount == null"
                >Loading..
              </v-card-subtitle>
            </div>
          </v-card>
        </v-slide-item>
      </router-link> -->
      <!-- END THREADS -->

      <!-- STARTS TELEGRAM -->
      <router-link :to="{ name: 'Account Monitoring' }">
        <v-slide-item v-slot="{ toggle }">
          <v-card
            class="ma-4"
            height="150"
            width="300"
            @click="toggle"
            color="primary"
            dark
          >
            <div class="ma-2">
              <v-card-title class="text-h5 mb-1">
                Telegram <v-spacer></v-spacer
                ><v-icon x-large>mdi-telegram</v-icon></v-card-title
              >
              <v-card-subtitle v-if="accountCount !== null">
                <div>
                  Total: {{ accountCount.telegram.total }} | Checkpoint:
                  {{ accountCount.telegram.checkpoint }}
                </div>
                <div>
                  Active: {{ accountCount.telegram.active }} | Not Active:
                  {{ accountCount.telegram.not_active }}
                </div>
              </v-card-subtitle>

              <v-card-subtitle v-if="accountCount == null"
                >Loading..
              </v-card-subtitle>
            </div>
          </v-card>
        </v-slide-item>
      </router-link>
      <!-- END TELEGRAM -->
    </v-slide-group>
  </v-sheet>

  <!-- END ACTIVITIES -->
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    accountCount: null,
    model: "",
  }),
  mounted() {
    this.fetchAccountCount();
  },
  methods: {
    async fetchAccountCount() {
      try {
        const token = localStorage.getItem("token");

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get("/api/account/count", config);
        this.accountCount = response.data.data;

        // ... (rest of the code remains the same)
      } catch (error) {
        console.error("Error:", error);
        // Handle errors as needed
      }
    },
  },
};
</script>

<style></style>
