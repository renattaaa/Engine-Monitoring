<template>
 <div class="not-found">
  <Navbar />
   <v-container style="background-color: #f5f5f5;" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" style="font-size: 8vh;">
        <Lottie
          :options="defaultOptions"
          :width="400"
          :height="400"
          class="lottie"
        />
        <p class="font-weight-medium text-center" style=" font-size: 1rem;">
          Sorry, the page you're looking for could not be found.
        </p>
        <p class="text-center">
          <router-link to="/" class="back">Bring me back!</router-link>
        </p>
      </v-col>
    </v-row>
  </v-container>
 </div>
</template>
  
<script>
import Navbar from "@/components/Header/NavbarAuth.vue";
import * as animationData from "@/assets/animations/error.json";
export default {
  name: "NotFoundError",
  data() {
    return {
      defaultOptions: {
        animationData: animationData.default,
      },
    };
  },
  components: {
    Navbar,
  },
};
</script>
  
<style>

.fill-height {
  color: #356859;
  min-height: 100vh;
}

.back {
  text-decoration: none;
  color: white;
  border-radius: 10px;
  display: inline-block;
  font-size: 1rem;
  padding: 6px 12px;
  transition: 0.3s, color 0.3s;
}

.back:hover {
  background-color: #08523b;
  color: white;
}

/* Animation for the icon */
@keyframes iconAnimation {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0.7);
  }
}
</style>
