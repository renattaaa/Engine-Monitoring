<template>
  <create-facebook>
    <b-button
      @click="dialog = true"
      pill
      class="btn-sm my-4 mx-auto ml-2"
      style="background-color: #356859; color: #fff; font-size: 12px"
    >
      New user <v-icon small dark>mdi-plus</v-icon>
    </b-button>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title style="color: #356859; font-weight: bold">
          Create Account <v-card-subtitle>Facebook</v-card-subtitle>
          <v-spacer></v-spacer>
          <button @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </button>
        </v-card-title>
        <v-card-text>
          <form @submit.prevent="createAccountFacebook">
            <v-row class="ma-2" align="center" justify="center">
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Email"
                  v-model="accountData.email"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Password"
                  v-model="accountData.password"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Phone number"
                  v-model="accountData.phone_number"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Password email"
                  v-model="accountData.password_email"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Status"
                  v-model="accountData.status"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Note"
                  v-model="accountData.note"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-card-actions>
              <p class="ma-3" v-if="loading">Creating...</p>
              <p class="ma-3" v-if="success" style="color: #356859">
                Account created
              </p>
              <p class="ma-3" v-if="error" style="color: red">
                Failed to create account
              </p>
              <v-spacer></v-spacer>
              <v-btn class="mb-4" text color="#356859" type="submit">
                Create Account
              </v-btn>
            </v-card-actions>
          </form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </create-facebook>
</template>

<script>
import axios from "axios";
export default {
  props: {
    fetchAccounts: Function,
  },
  data() {
    return {
      dialog: false,
      loading: false,
      success: false,
      error: false,
      accountData: {
        email: "",
        password: "",
        phone_number: "",
        password_email: "",
        status: "",
        note: "",
      },
    };
  },
  methods: {
    async createAccountFacebook() {
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
        const response = await axios.post(
          "/api/account/create-fb",
          this.accountData,
          config
        );

        this.fetchAccounts();

        this.$toast.success("Successfully created data!", {
          type: "success",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });

        console.log("Account created successfully:", response.data);
        this.resetForm();
        this.success = true;
        this.error = false;
        this.loading = false;
        setTimeout(() => {
          this.success = false;
        }, 3000);
        setTimeout(() => {
          this.error = false;
        }, 3000);
      } catch (error) {
        this.$toast.error("Failed created data", {
          type: "error",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });
        console.error("Error creating account:", error);
        this.resetForm();
        this.success = false;
        this.error = true;
        this.loading = false;
        setTimeout(() => {
          this.success = false;
        }, 3000);
        setTimeout(() => {
          this.error = false;
        }, 3000);
      }
    },
    resetForm() {
      this.accountData.email = "";
      this.accountData.password = "";
      this.accountData.phone_number = "";
      this.accountData.password_email = "";
      this.accountData.status = "";
      this.accountData.note = "";
    },
  },
};
</script>

<style></style>
