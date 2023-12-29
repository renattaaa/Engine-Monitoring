<template>
  <div>
    <v-app-bar elevate-on-scroll>
      <div class="container">
        <b-navbar-brand style="color: #356859; font-size: 18px;">
          <v-icon color="#356859">mdi-chart-bar</v-icon>
          <strong> Engine Monitoring</strong></b-navbar-brand
        >
      </div>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "NavbarAuth",
  data() {
    return {};
  },
};
</script>

<style>
.avatar-with-border {
  border: 2px solid #828282ca;
}
</style>
