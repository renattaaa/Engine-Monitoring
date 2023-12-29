<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap");
* {
  font-family: "Montserrat";
}
.v-main {
  background-color: #f5f5f5;
  min-height: 100vh;
}
</style>
