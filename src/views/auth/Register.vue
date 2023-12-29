<template>
  <div>
    <NavbarAuth />
    <div class="container">
      <!-- Desktop -->
      <div class="d-none d-md-block">
        <div class="row mt-5">
          <div class="col-md-6">
            <div class="d-flex h-100">
              <div class="justify-content-center align-self-center">
                <h2>Welcome to Engine Monitoring</h2>
                <p style="width: 70%">
                  Monitor, analyze, and manage your engines with ease.
                  Experience real-time control and accurate insights.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <Lottie
              :options="defaultOptions"
              :width="550"
              :height="550"
              class="lottie"
              style="top: 8%; left: 50%"
            />

            <v-card class="card mx-auto pa-3" width="350px" data-aos="zoom-in">
              <v-img
                class="mx-auto"
                src="@/assets/img/logoLama.png"
                width="200px"
              ></v-img>
              <h2 class="text-center font-weight-bold">Register</h2>
              <div class="text-form pa-3">
                <v-text-field
                  dense
                  class="text-input"
                  outlined
                  hide-details
                  label="Name"
                  v-model="name"
                ></v-text-field>
                <v-text-field
                  dense
                  class="text-input"
                  outlined
                  hide-details
                  label="Username"
                  v-model="username"
                ></v-text-field>
                <v-text-field
                  dense
                  class="text-input"
                  outlined
                  hide-details
                  :append-icon="passwordType ? 'mdi-eye-off' : 'mdi-eye'"
                  :type="passwordType ? 'password' : 'text'"
                  label="Password"
                  v-model="password"
                  @click:append="togglePassword"
                ></v-text-field>
              </div>
              <div class="text-center">
                <v-btn
                  class="btn-login my-2"
                  depressed
                  large
                  rounded
                  color="#356859"
                  @click="register"
                >
                  Sign Up
                </v-btn>
              </div>
              <div class="text-account text-center pb-1">
                <p>
                  Already have an account?
                  <router-link to="/login">Login here!</router-link>
                </p>
              </div>
            </v-card>
          </div>
        </div>
      </div>

      <!-- Mobile -->
      <div class="d-sm-block d-md-none mb-3">
        <div class="row mt-5">
          <div class="col-md-6 mb-2">
            <div class="text-center justify-content-center align-self-center">
              <h2>Welcome to Engine Monitoring</h2>
              <p>
                Monitor, analyze, and manage your engines with ease. Experience
                real-time control and accurate insights.
              </p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="d-flex h-100">
              <Lottie
                :options="defaultOptions"
                :width="470"
                :height="470"
                class="lottie"
                style="top: 27%; left: 14%"
              />

              <v-card
                class="card mx-auto pa-3"
                width="350px"
                data-aos="zoom-in"
              >
                <v-img
                  class="mx-auto"
                  src="@/assets/img/logoLama.png"
                  width="200px"
                ></v-img>
                <h2 class="text-center font-weight-bold">Register</h2>
                <div class="text-form pa-3">
                  <v-text-field
                    dense
                    class="text-input"
                    outlined
                    hide-details
                    label="Name"
                    v-model="name"
                  ></v-text-field>
                  <v-text-field
                    dense
                    class="text-input"
                    outlined
                    hide-details
                    label="Username"
                    v-model="username"
                  ></v-text-field>
                  <v-text-field
                    dense
                    class="text-input"
                    outlined
                    hide-details
                    :append-icon="passwordType ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="passwordType ? 'password' : 'text'"
                    label="Password"
                    v-model="password"
                    @click:append="togglePassword"
                  ></v-text-field>
                </div>
                <div class="text-center">
                  <v-btn
                    class="btn-login my-2"
                    depressed
                    large
                    rounded
                    color="#356859"
                    @click="register"
                  >
                    Sign Up
                  </v-btn>
                </div>
                <div class="text-account text-center pb-1">
                  <p>
                    Already have an account?
                    <router-link to="/login">Login here!</router-link>
                  </p>
                </div>
              </v-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import NavbarAuth from "@/components/Header/NavbarAuth.vue";
import * as animationData from "@/assets/animations/circle.json";

export default {
  name: "Register",
  data() {
    return {
      name: "",
      username: "",
      password: "",
      passwordType: true,
      defaultOptions: {
        animationData: animationData.default,
      },
    };
  },
  components: {
    NavbarAuth,
  },
  methods: {
    async register() {
      try {
        axios.post("/api/user/create", {
          name: this.name,
          username: this.username,
          level: 1,
          password: this.password,
        });

        this.$toast.success("You've successfully registered with us!", {
          type: "success",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });

        this.$router.push("/login");
      } catch (error) {
        this.$toast.error("Failed to registered your account", {
          type: "error",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });
        console.error("An error occurred:", error);
      }
    },
    togglePassword() {
      this.passwordType = !this.passwordType;
    },
  },
};
</script>
<style scoped>
.container {
  background-color: #f5f5f5;
}
.text-form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.btn-login {
  color: white;
  width: 150px;
}
.card {
  border-radius: 15px !important;
}
.text-center {
  color: #356859;
}
.lottie {
  position: absolute;
}
</style>
