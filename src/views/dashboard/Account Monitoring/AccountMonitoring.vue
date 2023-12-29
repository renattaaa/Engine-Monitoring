<template>
  <div class="account-monitoring" v-if="isLogin">
    <div class="mb-2">
      <h3 class="ml-7 font-weight-bold" style="color: #356859; margin-top: 5%">
        Account Monitoring
      </h3>
      <h6 class="ml-7 mt-2 text--secondary">
        Empowers you to effortlessly keep tabs on your media accounts
      </h6>
    </div>
    <Header @handeDrawer="drawer = !drawer" />
    <SideBar :drawer="drawer" @toggle-drawer="toggleDrawer" />
    <!-- INI BAGIAN CHART -->
    <v-row class="ma-2" data-aos="fade-left">
      <!-- Ini chart 1 -->
      <v-col cols="12" sm="6">
        <v-card elevation="6" max-width="100%">
          <v-subheader>Chart 1</v-subheader>
          <highcharts :options="optionsNullChart"></highcharts>
        </v-card>
      </v-col>
      <!-- Ini chart 2 -->
      <v-col cols="12" sm="6">
        <v-card elevation="6" max-width="100%">
          <v-subheader>Chart 2</v-subheader>
          <highcharts :options="optionsPieChart"></highcharts>
        </v-card>
      </v-col>
    </v-row>

    <!-- <Activities class="ma-5" data-aos="fade-right" /> -->

    <!-- INI BAGIAN GET ACCOUNT -->
    <v-row class="ma-2" data-aos="fade-right">
      <v-col>
        <GetPlatform @handeDrawer="drawer = !drawer" />
      </v-col>
    </v-row>
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
import axios from "axios"
import GetPlatform from "@/views/dashboard/Account Monitoring/GetPlatform.vue";
import SideBar from "@/components/SideBar";
import Header from "@/components/Header/Header.vue";
import { Chart } from "highcharts-vue";
import Activities from "@/components/Activities.vue";

export default {
  data: () => ({
    username: "",
    isLogin: false,
    accountCount: null,
    drawer: true,
    dialog: true,
    optionsNullChart: {
      chart: {
        type: "line",
        innerSize: "100%",
      },
      title: {
        text: "Account Analyze",
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
    optionsPieChart: {
      chart: {
        type: "pie",
        innerSize: "100%",
      },
      title: {
        text: "Account Analyze",
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

      axios
        .get("/api/account/count", config)
        .then((response) => {
          this.accountCount = response.data.data;

          this.optionsNullChart.series[0].data = [
            {
              name: "Instagram",
              y: this.accountCount.instagram.total,
            },
            {
              name: "Whatsapp",
              y: this.accountCount.whatsapp.total,
            },
            {
              name: "Twitter",
              y: this.accountCount.twitter.total,
            },
            {
              name: "Tiktok",
              y: this.accountCount.tiktok.total,
            },
            {
              name: "Facebook",
              y: this.accountCount.facebook.total,
            },
            {
              name: "Telegram",
              y: this.accountCount.telegram.total,
            },
          ];

          this.optionsPieChart.series[0].data = [
            {
              name: "Facebook",
              y: this.accountCount.facebook.total,
            },
            {
              name: "Twitter",
              y: this.accountCount.twitter.total,
            },
            {
              name: "Whatsapp",
              y: this.accountCount.whatsapp.total,
            },
            {
              name: "Tiktok",
              y: this.accountCount.tiktok.total,
            },
            {
              name: "Instagram",
              y: this.accountCount.instagram.total,
            },
            {
              name: "Telegram",
              y: this.accountCount.telegram.total,
            },
          ];
        })
        .catch((error) => console.error("Error:", error));
    },
  },
  components: {
    GetPlatform,
    SideBar,
    Header,
    highcharts: Chart,
    Activities,
  },
};
</script>
