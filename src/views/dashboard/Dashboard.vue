<template>
  <div v-if="isLogin" class="dashboard">
    <h3 class="ml-7 font-weight-bold" style="color: #356859; margin-top: 5%">
      Dashboard
    </h3>
    <v-row>
      <v-col lg="/" cols="12">
        <transition name="fade">
          <v-alert v-if="showMessage" dense text type="success" class="mt-3">
            <strong>Login Successfully:</strong> Welcome "{{ username }}"
            <v-icon color="green">mdi-emoticon-outline</v-icon>
          </v-alert>
        </transition>
      </v-col>
    </v-row>
    <Header @handeDrawer="drawer = !drawer" />
    <SideBar :drawer="drawer" @toggle-drawer="toggleDrawer" />
    <div>
      <Activities class="ma-6" data-aos="fade-left" />
      <LastUpdated class="ma-6" :lastUpdatedData="lastUpdatedData" />
    </div>
  </div>

  <!-- JIKA BELUM LOGIN TAMPILAN AKAN SEPERTI INI -->
  <div v-else style="background-color: #356859">
    <div class="text-center">
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title style="color: #356859; font-weight: bold">
            You are not logged in
          </v-card-title>
          <v-divider></v-divider>
          <br />
          <v-card-text>
            Access to this feature is only available after you successfully log
            in to your account. Please log in to your account or sign up if you
            don't have an account yet. Thank you for your understanding!
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              style="font-weight: bolder"
              text
              @click="dialog = true"
              to="/login"
            >
              Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar";
import Header from "@/components/Header/Header.vue";
import { Chart } from "highcharts-vue";
import Activities from "@/components/Activities.vue";
import LastUpdated from "@/components/LastUpdated.vue";

export default {
  name: "Dashboard",
  data: () => ({
    username: "",
    isLogin: false,
    cards: ["Today", "Yesterday"],
    accountCount: null,
    drawer: true,
    dialog: true,
    lastUpdatedData: [],
    showMessage: false,
    options: {
      chart: {
        type: "",
        height: "300",
      },
      title: {
        text: "",
      },
      series: [
        {
          minPointSize: 10,
          innerSize: "20%",
          zMin: 0,
          name: "Total",
          data: [],
        },
      ],
    },
  }),
  created() {
    const token = localStorage.getItem("token");
    if (token) {
      const nameOfUser = localStorage.getItem("username");
      this.isLogin = true;
      this.username = nameOfUser;
      this.showMessage = true;

      const storedLastUpdatedData = localStorage.getItem("lastUpdatedData");
      if (storedLastUpdatedData) {
        this.lastUpdatedData = JSON.parse(storedLastUpdatedData);
      }
      setTimeout(() => {
        this.showMessage = false;
      }, 3000);
    } else {
      this.isLogin = false;
    }
  },
  mounted() {
    this.fetchAccountCount();
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    fetchAccountCount() {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      fetch("/api/account/count", config, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          this.accountCount = data.data;
          this.options.series[0].data = [
            {
              name: "Instagram",
              y: this.accountCount.instagram.total,
            },
            {
              name: "Threads",
              y: this.accountCount.threads.total,
            },
            {
              name: "Whatsapp",
              y: this.accountCount.whatsapp.total,
            },
            {
              name: "Twitter",
              y: this.accountCount.twitter,
            },
            {
              name: "Tiktok",
              y: this.accountCount.tiktok,
            },
            {
              name: "Facebook",
              y: this.accountCount.facebook,
            },
            {
              name: "Telegram",
              y: this.accountCount.telegram,
            },
          ];
        })
        .catch((error) => console.log("Error:", error));
    },
  },
  components: {
    SideBar,
    Header,
    highcharts: Chart,
    Activities,
    LastUpdated,
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
