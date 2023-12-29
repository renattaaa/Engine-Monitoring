<template>
  <div class="account-monitoring" v-if="isLogin">
    <Header @handeDrawer="drawer = !drawer" />
    <SideBar :drawer="drawer" @toggle-drawer="toggleDrawer" />
    <div class="mb-2">
      <h3 class="ml-7 font-weight-bold" style="color: #356859; margin-top: 5%;">Engine Monitoring</h3>
      <h6 class="ml-7 mt-2 text--secondary">
        Simplify, control over your engines with easy-to-use CRUD functionality
      </h6>
    </div>

    <!-- INI BAGIAN GET ACCOUNT -->
    <v-row class="ma-2" data-aos="fade-left">
      <v-col>
        <Table @handeDrawer="drawer = !drawer" />
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
import SideBar from "@/components/SideBar";
import Header from "@/components/Header/Header.vue";
import Table from "@/views/dashboard/Engine Monitoring/Table.vue";

export default {
  data: () => ({
    username: "",
    isLogin: false,
    drawer: true,
    dialog: true,
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
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
  },
  components: {
    SideBar,
    Header,
    Table,
  },
};
</script>
