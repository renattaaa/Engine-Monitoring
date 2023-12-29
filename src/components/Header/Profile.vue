<template>
  <v-app v-if="isLogin" style="background-color: #f5f5f5">
    <Lottie :options="defaultOptions" class="lottie" />
    <div class="mx-auto my-auto">
      <v-card class="user-profile" data-aos="zoom-in" width="500">
        <div class="pa-2">
          <router-link to="/" style="text-decoration: none"
            ><v-icon>mdi-arrow-left</v-icon></router-link
          >
        </div>
        <v-card-text>
          <v-row>
            <v-col class="ml-3" md="4">
              <v-avatar size="100" class="avatar-with-border">
                <img class="pa-4" src="@/assets/img/user.svg" alt="" />
              </v-avatar>
              <v-card-title>
                {{ username }}
              </v-card-title>
            </v-col>
            <v-col>
              <div class="text-left" style="font-size: 12px">
                <b-form-group label="Name:">
                  <b-form-input
                    size="sm"
                    v-model="name"
                    readonly
                  ></b-form-input>
                </b-form-group>

                <b-form-group label="Role:" class="mt-2">
                  <b-form-input
                    v-if="level == 0"
                    size="sm"
                    v-model="admin"
                    readonly
                  ></b-form-input>
                  <b-form-input
                    v-else
                    size="sm"
                    v-model="user"
                    readonly
                  ></b-form-input>
                </b-form-group>

                <div class="mt-3">
                  <b-button-group
                    class="btn btn-sm"
                    style="color: grey"
                    :class="visible ? null : 'collapsed'"
                    :aria-expanded="visible ? 'true' : 'false'"
                    aria-controls="collapse-4"
                    @click="visible = !visible"
                  >
                    Change password?
                  </b-button-group>
                  <b-collapse id="collapse-4" v-model="visible" class="mt-2">
                    <b-card>
                      <form @submit.prevent="changePassword">
                        <v-divider></v-divider>
                        <div class="mt-3" style="font-size: 12px">
                          <!-- Old Password -->
                          <v-text-field
                            dense
                            v-model="oldPassword"
                            label="Old Password"
                            :type="showOldPassword ? 'text' : 'password'"
                            required
                            :append-icon="
                              showOldPassword ? 'mdi-eye' : 'mdi-eye-off'
                            "
                            @click:append="togglePasswordVisibility('old')"
                          ></v-text-field>

                          <!-- New Password -->
                          <v-text-field
                            dense
                            v-model="newPassword"
                            label="New Password"
                            :type="showNewPassword ? 'text' : 'password'"
                            required
                            :append-icon="
                              showNewPassword ? 'mdi-eye' : 'mdi-eye-off'
                            "
                            @click:append="togglePasswordVisibility('new')"
                          ></v-text-field>
                        </div>
                        <v-btn color="primary" type="submit" small>
                          Submit
                        </v-btn>
                      </form></b-card
                    >
                  </b-collapse>
                </div>
              </div>
              <br />
              <div>
                <button class="button" @click="logout">
                  <v-icon>mdi-logout</v-icon> Logout
                </button>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </div>
  </v-app>
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
import axios from "axios";
import * as animationData from "@/assets/animations/profile.json";
export default {
  data() {
    return {
      visible: false,
      showOldPassword: false,
      showNewPassword: false,
      username: "",
      name: "",
      level: "",
      admin: "Admin",
      user: "User",
      oldPassword: "",
      newPassword: "",
      isLogin: false,
      dialog: true,
      defaultOptions: {
        animationData: animationData.default,
      },
    };
  },
  created() {
    const token = localStorage.getItem("token");
    if (token) {
      const username = localStorage.getItem("username");
      const name = localStorage.getItem("name");
      const level = localStorage.getItem("level");

      this.isLogin = true;
      this.username = username;
      this.name = name;
      this.level = level;
    } else {
      this.isLogin = false;
    }
  },

  methods: {
    logout() {
      localStorage.removeItem("username");
      localStorage.removeItem("level");
      localStorage.removeItem("setupTime");
      localStorage.removeItem("name");
      localStorage.removeItem("token");

      this.isLogin = false;

      this.$router.push("/login");
    },
    async changePassword() {
      try {
        const response = await axios.put("/api/user/change-password", {
          username: this.username,
          old_password: this.oldPassword,
          new_password: this.newPassword,
        });

        if (response.data.status) {
          this.$toast.success("Successfully updated password!", {
            type: "success",
            position: "top-right",
            duration: 3000,
            dismissible: true,
          });

          this.resetForm();
        } else {
          this.$toast.error(response.data.message);
        }
      } catch (error) {
        this.$toast.error("An error occurred while changing password.", {
          type: "error",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });

        console.error("Error changing password:", error);
      }
    },
    resetForm() {
      this.oldPassword = "";
      this.newPassword = "";
    },
    togglePasswordVisibility(field) {
      if (field === "old") {
        this.showOldPassword = !this.showOldPassword;
      } else if (field === "new") {
        this.showNewPassword = !this.showNewPassword;
      }
    },
  },
};
</script>

<style scoped>
.router-link {
  text-decoration: none;
  color: grey;
}

.button {
  color: red;
  padding: 5px 15px;
  border-radius: 5px;
  transition: 0.3s, color 0.3s;
}
.button:hover {
  color: #356859;
}
.user-profile {
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}

h2 {
  margin: 0;
}

.lottie {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.avatar-with-border {
  border: 2px solid #828282ca;
}
</style>
