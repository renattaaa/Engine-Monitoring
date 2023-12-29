<template>
  <edit-auth>
    <b-button
      @click="dialog = true"
      pill
      class="btn-sm my-4 mx-auto ml-2"
      style="background-color: #356859; color: #fff; font-size: 12px"
    >
      Update auth <v-icon small dark>mdi-account-edit</v-icon>
    </b-button>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title style="color: #356859; font-weight: bold">
          Update Auth
          <v-spacer></v-spacer>
          <button @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </button>
        </v-card-title>
        <v-card-text>
          <v-container>
            <form @submit.prevent="updateAccount">
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field v-model="id" label="ID" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-select
                    v-model="authType"
                    :items="[{ text: 'Web Cookies', value: 'web_cookies' }]"
                    label="Auth Type"
                    required
                    item-text="text"
                    item-value="value"
                  ></v-select>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="authValue"
                    label="Auth Value"
                    placeholder="{ }"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <p class="ma-3" v-if="loading">Updating...</p>
          <p class="ma-3" v-if="success" style="color: #356859">
            Auth account updated
          </p>
          <p class="ma-3" v-if="error" style="color: red">
            Failed to update auth account
          </p>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="updateAccount"
            :disabled="loading"
            type="submit"
            class="dialog-button"
            style="color: #356859"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </edit-auth>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      dialog: false,
      success: false,
      error: false,
      loading: false,
      id: "",
      authType: "",
      authValue: "",
    };
  },
  methods: {
    async updateAccount() {
      this.loading = true;
      this.success = false;
      this.error = false;
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const requestData = {
        id: this.id,
        auth_type: this.authType,
        auth_value: JSON.parse(this.authValue),
      };

      axios
        .put("/api/account/update/auth", requestData, config)
        .then((response) => {
          this.resetform();
          this.$toast.success("Successfully updated data!", {
            type: "success",
            position: "top-right",
            duration: 3000,
            dismissible: true,
          });
          this.success = true;
          this.error = false;
          this.loading = false;
          setTimeout(() => {
            this.success = false;
          }, 3000);
          setTimeout(() => {
            this.error = false;
          }, 3000);
          console.log(response.data);
        })
        .catch((error) => {
          this.$toast.error("Failed updated data", {
            type: "error",
            position: "top-right",
            duration: 3000,
            dismissible: true,
          });
          this.success = false;
          this.error = true;
          this.loading = false;
          setTimeout(() => {
            this.success = false;
          }, 3000);
          setTimeout(() => {
            this.error = false;
          }, 3000);
          console.error(error);
        });
    },
    resetform() {
      this.id = "";
      this.authType = "";
      this.authValue = "";
    },
  },
};
</script>

<style></style>
