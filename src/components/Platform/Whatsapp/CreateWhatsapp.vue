<template>
  <div>
    <button color="primary" disabled text class="pa-2" @click="dialog = true">
      New Account
    </button>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title style="color: #356859; font-weight: bold">
          Create Account <v-card-subtitle>Instagram</v-card-subtitle>
          <v-spacer></v-spacer>
          <button @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </button>
        </v-card-title>
        <v-card-text>
          <form @submit.prevent="createAccountInstagram">
            <v-row class="ma-2" align="center" justify="center">
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Id"
                  v-model="formData.id"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Username"
                  v-model="formData.username"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Password"
                  v-model="formData.password"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Email"
                  v-model="formData.email"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Email Password"
                  v-model="formData.email_password"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Phone Number"
                  v-model="formData.phone_number"
                  required
                ></v-text-field>
              </v-col>
              <div>
                <v-card-subtitle> Has Threads? </v-card-subtitle>
              </div>
              <v-col cols="12" sm="6" md="3">
                <v-radio-group v-model="formData.has_threads">
                  <v-radio label="Yes" value="true"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-radio-group v-model="formData.has_threads">
                  <v-radio label="No" value="false"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
            <v-card-actions>
              <p v-if="loading">Creating...</p>
              <p v-if="success">Account created successfully</p>
              <p v-if="error">Failed to create account</p>
              <v-spacer></v-spacer>
              <v-btn class="mb-4" text color="#356859" type="submit">
                Create Account
              </v-btn>
            </v-card-actions>
          </form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      dialog: false,
      loading: false,
      success: false,
      error: false,
      formData: {
        id: "",
        username: "",
        password: "",
        email: "",
        email_password: "",
        phone_number: "",
        has_threads: true,
      },
    };
  },
  methods: {
    async createAccountInstagram() {
      try {
        this.loading = true;
        this.success = false;
        this.error = false;
        const token = localStorage.getItem("token");

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.post("/api/account/create", this.formData, config);
        console.log("Account created successfully:", response.data);
        this.resetForm();
        this.success = true;
        this.error = false;
        this.loading = false;
      } catch (error) {
        console.error("Error creating account:", error);
        this.resetForm();
        this.success = false;
        this.error = true;
        this.loading = false;
      }
    },
    resetForm() {
      this.formData.id = "";
      this.formData.username = "";
      this.formData.password = "";
      this.formData.email = "";
      this.formData.email_password = "";
      this.formData.phone_number = "";
      this.formData.has_threads = true;
    },
  },
};
</script>

<style></style>
