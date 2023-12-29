<template>
  <nav>
    <v-navigation-drawer v-model="drawer" app dark color="primary">
      <div class="text-center pt-5">
        <v-img
          class="mx-auto mt-3 mb-6"
          src="@/assets/img/Logo.png"
          height="100px"
          width="220px"
        ></v-img>
        <v-divider color="white"></v-divider>
      </div>
      <v-list rounded dense class="mt-5">
        <v-list-item-group v-model="selectedItem" color="white">
          <div v-if="level === '0'">
            <v-list-item
              v-for="[icon, text, link] in admin"
              :key="icon"
              :to="link"
              @click="handleClick(link)"
            >
              <v-list-item-icon>
                <v-icon>{{ icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ text }}</v-list-item-title>
            </v-list-item>
          </div>
          <div v-else>
            <v-list-item
              v-for="[icon, text, link] in user"
              :key="icon"
              :to="link"
              @click="handleClick(link)"
            >
              <v-list-item-icon>
                <v-icon>{{ icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ text }}</v-list-item-title>
            </v-list-item>
          </div>
          <div class="bottom-item-admin" v-if="level === '0'"></div>
          <div class="bottom-item-user" v-else></div>
          <v-list-item @click.prevent="logout">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>

          <!-- Dropdown for User Monitoring and Logout -->
          <!-- <v-list-group
            :value="true"
            prepend-icon="mdi-logout"
            persistent
            color="white"
          >
            <template v-slot:activator>
              <v-list-item-title>Logout</v-list-item-title>
            </template>
            <v-list-item v-if="level === '0'" @click.prevent="handleUser">
              <v-list-item-title>User Monitoring</v-list-item-title>
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
            </v-list-item>
            <v-list-item v-else disabled>
              <v-list-item-title>User Monitoring</v-list-item-title>
              <v-list-item-icon>
                <v-icon color="grey">mdi-account-lock</v-icon>
              </v-list-item-icon>
            </v-list-item>
            <v-list-item @click.prevent="logout">
              <v-list-item-title>Logout</v-list-item-title>
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group> -->
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  name: "SideBar",
  props: ["drawer"],
  data: () => ({
    selectedItem: 0,
    admin: [
      ["mdi-home-outline", "Dashboard", "/"],
      ["mdi-chart-pie", "Account Monitoring", "account-monitoring"],
      ["mdi-web", "Engine Monitoring", "engine-monitoring"],
      ["mdi-search-web", "Percolator", "percolator"],
      ["mdi-file-document-outline", "Document", "document"],
      ["mdi-message-alert", "Alert", "alert"],
      ["mdi-account", "User Management", "user-management"],
    ],
    user: [
      ["mdi-home-outline", "Dashboard", "/"],
      ["mdi-chart-pie", "Account Monitoring", "account-monitoring"],
      ["mdi-web", "Engine Monitoring", "engine-monitoring"],
      ["mdi-search-web", "Percolator", "percolator"],
      ["mdi-file-document-outline", "Document", "document"],
      ["mdi-message-alert", "Alert", "alert"],
    ],
  }),
  computed: {
    level() {
      return localStorage.getItem("level");
    },
  },
  methods: {
    handleClick(link) {
      if (link === "login") {
        this.logout();
      }
    },
    logout() {
      localStorage.removeItem("username");
      localStorage.removeItem("level");
      localStorage.removeItem("setupTime");
      localStorage.removeItem("name");
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
    // handleUser() {
    //   this.$router.push("/user-monitoring");
    // },
  },
};
</script>

<style>
.bottom-item-admin {
  margin-bottom: 110px;
}
.bottom-item-user {
  margin-bottom: 150px;
}
</style>
