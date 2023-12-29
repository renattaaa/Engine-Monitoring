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

            <v-card class="card mx-auto mt-2 pa-3" width="350px" data-aos="zoom-in">
              <v-img
                class="mx-auto my-auto"
                src="@/assets/img/logoLama.png"
                width="200px"
              ></v-img>
              <h2 class="text-center font-weight-bold">Login</h2>
              <div class="text-form pa-2">
                <v-text-field
                  dense
                  class="text-input mb-2"
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
                  v-model="password"
                  :append-icon="passwordType ? 'mdi-eye-off' : 'mdi-eye'"
                  :type="passwordType ? 'password' : 'text'"
                  label="Password"
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
                  @click="login"
                  @keyup="login"
                >
                  Login
                </v-btn>
              </div>
              <div class="text-account text-center pb-1">
                <p hidden>
                  Don’t have an account?
                  <router-link to="/register">Make one here!</router-link>
                </p>
              </div>
              <transition name="fade">
                <div v-if="invalidCredential">
                  <p class="text-center" style="color: red">
                    Invalid credentials. Please check your username and
                    password.
                  </p>
                </div>
              </transition>
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
                  class="mx-auto my-auto"
                  src="@/assets/img/logoLama.png"
                  width="200px"
                ></v-img>
                <h2 class="text-center font-weight-bold">Login</h2>
                <div class="text-form pa-2">
                  <v-text-field
                    dense
                    class="text-input mb-2"
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
                    v-model="password"
                    :append-icon="passwordType ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="passwordType ? 'password' : 'text'"
                    label="Password"
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
                    @click="login"
                    @keyup="login"
                  >
                    Login
                  </v-btn>
                </div>
                <div class="text-account text-center pb-1">
                  <p hidden>
                    Don’t have an account?
                    <router-link to="/register">Make one here!</router-link>
                  </p>
                </div>
                <transition name="fade">
                  <div v-if="invalidCredential">
                    <p class="text-center" style="color: red">
                      Invalid credentials. Please check your username and
                      password.
                    </p>
                  </div>
                </transition>
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
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      passwordType: true,
      invalidCredential: false,
      defaultOptions: {
        animationData: animationData.default,
      },
    };
  },
  components: {
    NavbarAuth,
  },
  methods: {
    checkAndClearLocalStorage() {
      var hours = 24;
      var now = new Date().getTime();
      var setupTime = localStorage.getItem("setupTime");
      if (setupTime == null || now - setupTime > hours * 60 * 60 * 1000) {
        localStorage.removeItem("username");
        localStorage.removeItem("level");
        localStorage.removeItem("setupTime");
        localStorage.removeItem("name");
        localStorage.removeItem("token");
        localStorage.setItem("setupTime", now);
      }
    },
    async login() {
      // Call the function to check and clear localStorage
      this.checkAndClearLocalStorage();

      const requestData = {
        username: this.username,
        password: this.password,
      };

      try {
        const response = await axios.post("/api/user/login", requestData);

        // Save the token in local storage
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("name", response.data.data.name);
        localStorage.setItem("level", response.data.data.level);
        localStorage.setItem("username", this.username);

        // Redirect to the /dashboard page
        this.$router.push("/");
      } catch (error) {
        console.error(error);
        this.invalidCredential = true;
        setTimeout(() => {
          this.invalidCredential = false;
        }, 3000);
      }
    },
    togglePassword() {
      this.passwordType = !this.passwordType;
    },
  },
  created() {
    // Call the function when the component is created
    this.checkAndClearLocalStorage();
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
