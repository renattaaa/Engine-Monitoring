<template>
  <v-app-bar
    app
    color="white"
    elevation="3"
    style="border-radius: 20px; margin: 10px"
  >
    <v-app-bar-nav-icon @click="$emit('handeDrawer')"></v-app-bar-nav-icon>
    <v-spacer />
    <v-spacer />

    <!-- account icon -->
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <span
          v-bind="attrs"
          v-on="on"
          style="cursor: pointer"
          class="mx-5 mr-10"
        >
          <v-chip link>
            <v-badge dot bottom offset-x="7" offset-y="10" color="green">
              <v-icon color="#a9a5a5">mdi-account</v-icon>
              <span>{{ username }}</span>
            </v-badge>
          </v-chip>
        </span>
      </template>
      <v-list width="250" class="py-0">
        <v-list-item two-line>
          <v-list-item-avatar class="avatar-with-border">
            <img class="pa-2" src="@/assets/img/user.svg" alt="" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title> {{ username }} </v-list-item-title>
            <v-list-item-subtitle> Logged In </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider color="grey" class="mt-3"></v-divider>
        <v-list-item-group>
          <v-list-item
            v-for="[title, icon, link] in menus"
            :key="icon"
            :to="link"
            link
            @click="handleMenuItemClick(link)"
          >
            <v-list-item-icon>
              <v-icon>{{ icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click.prevent="logout">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <!-- account icon -->
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      username: "",
      isLogin: false,
      menus: [["Profile", "mdi-account", "profile"]],
    };
  },
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
    handleMenuItemClick(link) {
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
  },
};
</script>

<style>
.avatar-with-border {
  border: 2px solid #828282ca;
}
</style>
