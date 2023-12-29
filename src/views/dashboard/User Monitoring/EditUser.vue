<template>
  <div>
    <button color="primary" text class="pa-2" @click="dialog = true">
      <v-icon small color="grey" dark>mdi-pencil</v-icon>
    </button>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title style="color: #356859; font-weight: bold">
          Edit user
          <v-spacer></v-spacer>
          <button @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </button>
        </v-card-title>
        <v-card-text>
          <v-container>
            <form @submit.prevent="updateUser">
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="dataUsers.username"
                    label="Username"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-autocomplete
                    v-model="role"
                    :items="levelOptions"
                    label="Role"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="dataUsers.name"
                    label="Name"
                  ></v-text-field>
                </v-col>

                <!-- <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="dataUsers.password"
                    label="Password"
                    required
                  ></v-text-field>
                </v-col> -->
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
            @click="updateUser"
            :disabled="loading"
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
    dataUsers: Object,
    dataRole: String,
    fetchUsers: Function,
  },
  data() {
    return {
      dialog: false,
      success: false,
      error: false,
      loading: false,
      role: this.dataRole,
      levelOptions: [
        { text: "Admin", value: 0 },
        { text: "User", value: 1 },
      ],
    };
  },
  methods: {
    async updateUser() {
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

        const updatedData = { ...this.dataUsers, level: this.role };
        axios.put(`/api/user/update`, updatedData, config);

        this.$toast.success("Successfully updated data!", {
          type: "success",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });

        this.fetchUsers();
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
