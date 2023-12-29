<template>
  <create-location>
    <b-button
      @click="dialog = true"
      pill
      class="btn-sm my-4 mx-auto ml-2"
      style="background-color: #356859; color: #fff; font-size: 12px"
    >
      New place <v-icon small dark>mdi-plus</v-icon>
    </b-button>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title style="color: #356859; font-weight: bold">
          Create New Place
          <v-spacer></v-spacer>
          <button @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </button>
        </v-card-title>
        <v-card-text>
          <form @submit.prevent="createPercolator">
            <v-row align="center" justify="center">
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Place Name"
                  v-model="data.name"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Coordinate"
                  v-model="data.coordinate"
                  placeholder="[ 0, 0 ]"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Query"
                  v-model="data.query"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-card-actions>
              <p class="ma-3" v-if="loading">Creating...</p>
              <p class="ma-3" v-if="success" style="color: #356859">
                Account created successfully
              </p>
              <p class="ma-3" v-if="error" style="color: red">
                Failed to create account
              </p>
              <v-spacer></v-spacer>
              <v-btn class="mb-4" text color="#356859" type="submit">
                Submit
              </v-btn>
            </v-card-actions>
          </form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </create-location>
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
      data: {
        name: "",
        coordinate: [],
        type: "place",
        query: "",
      },
    };
  },
  methods: {
    async createPercolator() {
      try {
        this.loading = true;
        this.success = false;
        this.error = false;

        const response = await axios.post(
          "/service-percolator/api/v1/percolator/locations",
          this.data
        );

        this.$toast.success("Successfully created data!", {
          type: "success",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });

        console.log("Created successfully:", response.data);
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
        this.$toast.error("Error creating data.", {
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
      this.data.name = "";
      this.data.coordinate = "";
      this.data.type = "place";
      this.data.query = "";
    },
  },
};
</script>

<style></style>
