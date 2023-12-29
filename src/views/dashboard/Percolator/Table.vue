<template>
  <div>
    <v-row>
      <v-col>
        <v-text-field
          rounded
          v-model="search"
          label="Search"
          single-line
          solo
          append-icon="mdi-magnify"
          style="width: 50%; font-size: 12px"
        ></v-text-field>
      </v-col>
      <v-col class="text-right">
        <!-- START FILTERING BY USER -->
        <b-button
          @click="filterLocation = true"
          pill
          class="btn-sm my-4 mx-auto"
          style="font-size: 12px"
        >
          Filter <v-icon small dark>mdi-filter-outline</v-icon>
        </b-button>
        <v-dialog scrollable max-width="600" v-model="filterLocation">
          <v-card>
            <v-card-title style="color: #356859; font-weight: bold">
              Filter location  <span class="ml-2"><v-icon small color="primary">mdi-filter-variant</v-icon></span>
              <v-spacer></v-spacer>
              <button
                class="dialog-button"
                text
                @click="filterLocation = false"
              >
                <v-icon color="grey">mdi-close</v-icon>
              </button>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text style="height: 200px" class="pa-6">
              <label for="province">Select city from province:</label>
              <v-autocomplete
                v-model="selectedProvince"
                :items="provinces"
                item-text="location_province_name"
                item-value="location_province_code"
                @input="fetchCityData"
              ></v-autocomplete>

              <label for="city">Select district from city:</label>
              <v-autocomplete
                v-model="selectedCity"
                :items="filteredCityData"
                item-text="location_city_name"
                item-value="location_city_code"
                @input="fetchDistrictData"
              ></v-autocomplete>

              <!-- <label for="city">Select district:</label>
                    <v-autocomplete
                      v-model="selectedDistrict"
                      :items="filteredDistrictData"
                      item-text="location_district_name"
                    ></v-autocomplete> -->
            </v-card-text>
            <v-divider></v-divider>
          </v-card>
        </v-dialog>
        <!-- END FILTERING BY USER -->
        <CreateLocation />
      </v-col>
    </v-row>

    <v-card elevation="6">
      <v-subheader>
        <strong>Get location</strong>
      </v-subheader>

      <v-divider></v-divider>

      <v-data-table
        v-if="type"
        style="white-space: nowrap"
        :headers="headers"
        :items="locations"
        :items-per-page="10"
        :loading="loading"
        height="400"
        :fixed-header="true"
        :search="search"
        item-key="id"
      >
        <template v-slot:body="{ items }">
          <tbody>
            <tr v-for="(item, index) in items" :key="item.id">
              <td>{{ index + 1 }}</td>
              <td>{{ item.location_code }}</td>
              <td>{{ item.location_name }}</td>
              <td>{{ item.location_coordinate }}</td>
              <td>{{ item.location_type }}</td>
              <td>{{ item.query.query_string.query }}</td>
              <td>
                <v-card-actions>
                  <button
                    text
                    @click="showContentPopup(item.query.query_string.query)"
                  >
                    <v-icon small>mdi-eye</v-icon>
                  </button>
                  <EditLocation
                    :locationId="item.id"
                    :locationQuery="item.query.query_string.query"
                    iconSize="small"
                  />
                  <button text @click="deleteLocation(item.id)">
                    <v-icon small>mdi-delete</v-icon>
                  </button>
                </v-card-actions>
              </td>
            </tr>
          </tbody>
        </template>
        <template v-slot:no-data>
          <div>
            <Lottie
              :options="defaultOptions"
              :width="250"
              :height="250"
              class="center"
            />
            <h6 class="text-center">No data available, cheer up! 🌟</h6>
          </div>
        </template>
      </v-data-table>

      <v-data-table
        v-if="!type"
        style="white-space: nowrap"
        :headers="headers"
        :items="provinces"
        :items-per-page="10"
        :loading="loading"
        height="400"
        :fixed-header="true"
        :search="search"
        item-key="id"
      >
        <template v-slot:body="{ items }">
          <tbody>
            <tr v-for="(item, index) in items" :key="item.id">
              <td>{{ index + 1 }}</td>
              <td>{{ item.location_code }}</td>
              <td>{{ item.location_name }}</td>
              <td>{{ item.location_coordinate }}</td>
              <td>{{ item.location_type }}</td>
              <td>
                <button
                  text
                  @click="showContentPopup(item.query.query_string.query)"
                >
                  <v-icon small>mdi-eye</v-icon>
                </button>
              </td>
              <td>
                <v-card-actions>
                  <EditLocation
                    :locationId="item.id"
                    :locationQuery="item.query.query_string.query"
                    iconSize="small"
                  />
                  <button text @click="deleteLocation(item.id)">
                    <v-icon small>mdi-delete</v-icon>
                  </button>
                </v-card-actions>
              </td>
            </tr>
          </tbody>
        </template>
        <template v-slot:no-data>
          <div>
            <Lottie
              :options="defaultOptions"
              :width="250"
              :height="250"
              class="center"
            />
            <h6 class="text-center">No data available, cheer up! 🌟</h6>
          </div>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import CreateLocation from "@/views/dashboard/Percolator/CreateLocation.vue";
import EditLocation from "@/views/dashboard/Percolator/EditLocation.vue";
import * as animationData from "@/assets/animations/no-data.json";

import axios from "axios";
export default {
  data() {
    return {
      loading: false,
      type: "",
      search: "",
      filterLocation: false,
      provinces: [],
      selectedProvince: "",
      filteredCityData: [],
      selectedCity: "",
      filteredDistrictData: [],
      selectedDistrict: null,
      locations: [],
      defaultOptions: {
        animationData: animationData.default,
      },
      headers: [
        { text: "No", value: "no", sortable: false },
        { text: "Code", value: "location_code", sortable: false },
        { text: "Name", value: "location_name", sortable: false },
        { text: "Coordinate", value: "location_coordinate", sortable: false },
        { text: "Location Type", value: "location_type", sortable: false },
        { text: "Query", value: "query.query_string.query", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  // computed: {
  //   filteredLocations() {
  //     return this.locations.filter(
  //       (location) => location.location_type === this.type
  //     );
  //   },
  // },
  created() {
    this.fetchProvinceData();
  },
  methods: {
    fetchProvinceData() {
      this.loading = true;
      const url =
        "/service-percolator/api/v1/percolator/locations?page=1&size=34&type=province";
      axios
        .get(url)
        .then((response) => {
          if (response.status === 200) {
            const data = response.data;

            if (data.status && data.data && data.data.data) {
              this.provinces = data.data.data;
              this.loading = false;
            }
          }
        })
        .catch((error) => {
          this.loading = false;
          console.error("Error fetching data:", error);
        });
    },
    fetchCityData() {
      this.loading = true;
      const url = `/service-percolator/api/v1/percolator/locations?page=1&size=1000&type=city`;

      axios
        .get(url)
        .then((response) => {
          if (response.status === 200) {
            const data = response.data;

            if (data.status && data.data && data.data.data) {
              this.filteredCityData = data.data.data.filter((location) => {
                return (
                  location.location_province_code === this.selectedProvince
                );
              });

              this.loading = false;
              this.locations = this.filteredCityData;
              this.type = true;
            }
          }
        })
        .catch((error) => {
          this.loading = false;
          console.error("Error fetching data:", error);
        });
    },

    fetchDistrictData() {
      this.loading = true;
      const url = `/service-percolator/api/v1/percolator/locations?page=1&size=1000&type=district`;

      axios
        .get(url)
        .then((response) => {
          if (response.status === 200) {
            const data = response.data;

            if (data.status && data.data && data.data.data) {
              this.filteredDistrictData = data.data.data.filter((location) => {
                return location.location_city_code === this.selectedCity;
              });

              this.loading = false;
              this.locations = this.filteredDistrictData;
              this.type = true;
            }
          }
        })
        .catch((error) => {
          this.loading = false;
          console.error("Error fetching data:", error);
        });
    },
    deleteLocation(Id) {
      this.$swal
        .fire({
          title: "Delete location",
          text: "Are you sure you want to delete this location?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#356859",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            axios
              .delete(`/service-percolator/api/v1/percolator/locations/${Id}`)
              .then(() => {
                this.$swal.fire({
                  title: "Deleted!",
                  text: "Successfully deleted data!",
                  icon: "success",
                  confirmButtonColor: "#356859",
                });
              })
              .catch((error) => {
                console.error("Error:", error);
                this.$swal.fire({
                  title: "Error!",
                  text: "Failed to delete data",
                  icon: "error",
                  confirmButtonColor: "#356859",
                });
              });
          }
        });
    },

    // DETAIL ALERT
    showContentPopup(content) {
      this.$swal.fire({
        title: "Detail Query",
        text: content,
        icon: "info",
        confirmButtonColor: "#356859",
      });
    },
  },
  components: {
    CreateLocation,
    EditLocation,
  },
};
</script>

<style>
td {
  white-space: nowrap;
}
</style>
