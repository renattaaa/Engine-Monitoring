<template>
  <div>
    <button color="primary" text class="pa-2" @click="dialog = true">
      <v-icon small color="grey" dark>mdi-pencil</v-icon>
    </button>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title style="color: #356859; font-weight: bold">
          Edit Account
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
                  <v-text-field
                    v-model="accountData.email"
                    label="Email"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="accountData.password"
                    label="Password"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="accountData.phone_number"
                    label="Phone Number"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="accountData.password_email"
                    label="Password Email"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="accountData.status"
                    label="Status"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="accountData.note"
                    label="Note"
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
            Account updated
          </p>
          <p class="ma-3" v-if="error" style="color: red">
            Failed to update account
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
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    accountData: Object,
    accountId: String,
    fetchAccounts: Function,
  },
  data() {
    return {
      dialog: false,
      success: false,
      error: false,
      loading: false,
    };
  },
  methods: {
    async updateAccount() {
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
        const response = await axios.put(
          `/api/account/update-account-fb?id_account=${this.accountId}`,
          this.accountData,
          config
        );

        this.fetchAccounts();

        this.$toast.success("Successfully updated data!", {
          type: "success",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });

        console.log(response.data);
        this.accountData.last_updated = new Date();
        this.success = true;
        this.error = false;
        this.loading = false;
        setTimeout(() => {
          this.success = false;
        }, 3000);
        setTimeout(() => {
          this.error = false;
        }, 3000);

        const uniqueKey = `updatedAccount_${Date.now()}`;
        this.accountData.source = "Facebook";
        localStorage.setItem(uniqueKey, JSON.stringify(this.accountData));
      } catch (error) {
        this.$toast.error("Failed updated data", {
          type: "error",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });
        console.error(error);
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
  },
};
</script>

<style></style>
