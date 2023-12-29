<template>
  <div>
    <button color="primary" text class="pa-2" @click="dialog = true">
      <v-icon
        :small="iconSize === 'small'"
        :default="iconSize === 'default'"
        color="grey"
        dark
        >mdi-pencil</v-icon
      >
    </button>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title style="color: #356859; font-weight: bold">
          Edit Location
          <v-spacer></v-spacer>
          <button @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </button>
        </v-card-title>
        <v-card-text>
          <v-container>
            <form @submit.prevent="updateLocation">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="locationQuery"
                    label="Query"
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
            Account updated successfully
          </p>
          <p class="ma-3" v-if="error" style="color: red">
            Failed to update account
          </p>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="updateLocation"
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
    locationId: String,
    locationQuery: String,
    iconSize: String,
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
    async updateLocation() {
      try {
        this.loading = true;
        this.success = false;
        this.error = false;

        const updatedData = { id: this.locationId, query: this.locationQuery };
        const response = await axios.put(
          "/service-percolator/api/v1/percolator/locations",
          updatedData
        );

        this.$toast.success("Successfully updated data!", {
          type: "success",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });

        console.log(response.data);
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
        this.$toast.error("Error updated data.", {
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
