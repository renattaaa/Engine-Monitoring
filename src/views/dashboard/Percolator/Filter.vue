<template>
  <div class="Percolator" v-if="isLogin">
    <Header @handeDrawer="drawer = !drawer" />
    <SideBar :drawer="drawer" />
    <v-subheader class="ma-5 mb-0 d-flex justify-space-between align-center">
      <h1 style="color: #356859; font-size: 32px">Percolator Page</h1>
    </v-subheader>

    <div class="ma-3 ml-6">
      <v-row>
        <v-col>
          <SearchLocation />
        </v-col>
      </v-row>
    </div>

    <div class="ma-6">
      <v-row data-aos="fade-left">
        <v-col>
          <v-card elevation="6">
            <v-subheader>
              <v-dialog scrollable max-width="600" v-model="selectType">
                <template v-slot:activator="{ on, attrs }">
                  <v-text v-bind="attrs" v-on="on">
                    Get location
                    <v-icon medium color="grey" dark> mdi-chevron-down </v-icon>
                  </v-text>
                </template>

                <v-card>
                  <v-card-title style="color: #356859; font-weight: bold">
                    Select type
                    <v-spacer></v-spacer>
                    <button
                      class="dialog-button"
                      text
                      @click="selectType = false"
                    >
                      <v-icon color="grey">mdi-close</v-icon>
                    </button>
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-card-text style="height: 200px" class="pa-6">
                    <label for="province">Select province:</label>
                    <v-select
                      v-model="selectedProvince"
                      :items="provinces"
                      label="Select province"
                      @input="filterCities"
                    />
                    <label for="city">Select city:</label>
                    <v-select
                      v-model="selectedCity"
                      :items="filteredCities"
                      label="Select city"
                      @input="filterAreas"
                    />
                    <label for="district">Select district:</label>
                    <v-select
                      v-model="selectedArea"
                      :items="filteredAreas"
                      label="Select district"
                    />
                  </v-card-text>
                  <!-- Display the selected location -->
                  <div v-if="selectedArea">
                    <h2>Selected Location:</h2>
                    <p>Province: {{ selectedProvinceName }}</p>
                    <p>City: {{ selectedCityName }}</p>
                    <p>Area: {{ selectedAreaName }}</p>
                  </div>
                  <v-divider></v-divider>
                </v-card>
              </v-dialog>
              <v-spacer></v-spacer>
              <CreateLocation />
            </v-subheader>
            <v-divider></v-divider>

            <v-data-table v-if="!type" height="400">
              <template v-slot:no-data>
                <div class="text-center no-data-available">
                  Choose location first
                </div>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>

  <!-- JIKA BELUM LOGIN TAMPILAN AKAN SEPERTI INI -->
  <div v-else style="background-color: #356859">
    <div class="text-center">
      <v-dialog v-model="dialogNotLogin" width="500">
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
              @click="dialog1 = true"
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
import Header from "@/components/Header/Header.vue";
import SideBar from "@/components/SideBar.vue";
import SearchLocation from "@/views/dashboard/Percolator/SearchLocation.vue";
import CreateLocation from "@/views/dashboard/Percolator/CreateLocation.vue";

export default {
  data() {
    return {
      isLogin: false,
      username: "",
      drawer: null,
      dialogNotLogin: false,
      type: "",
      selectType: false,
      selectedProvince: null,
      selectedCity: null,
      selectedArea: null,
      locations: [], 
      provinces: [],
      filteredCities: [],
      filteredAreas: [],
    };
  },

  created() {
    const token = localStorage.getItem("token");
    if (token) {
      const nameOfUser = localStorage.getItem("username");
      this.isLogin = true;
      this.username = nameOfUser;
    } else {
      this.isLogin = false;
    }
    axios
      .get(
        "/percolator-rta/api/v1/percolator/locations?page=1&size=34&type=province"
      )
      .then((response) => {
        this.locations = response.data.data.data;
        this.provinces = this.locations
          .filter((location) => location.location_type === "province")
          .map((province) => ({
            value: province.location_province_code,
            text: province.location_province_name,
          }));
        console.log("bisa nih datanya: ", response);
      })
      .catch((error) => {
        console.error("Error fetching locations:", error);
      });
  },
  computed: {
    selectedProvinceName() {
      if (this.selectedProvince) {
        const province = this.provinces.find(
          (p) => p.location_province_code === this.selectedProvince
        );
        return province ? province.location_province_name : "";
      }
      return "";
    },
    selectedCityName() {
      if (this.selectedCity) {
        const city = this.filteredCities.find(
          (c) => c.location_city_code === this.selectedCity
        );
        return city ? city.location_city_name : "";
      }
      return "";
    },
    selectedAreaName() {
      if (this.selectedArea) {
        const area = this.filteredAreas.find(
          (a) => a.location_district_code === this.selectedArea
        );
        return area ? area.location_district_name : "";
      }
      return "";
    },
  },
  methods: {
    filterCities() {
      if (this.selectedProvince) {
        this.filteredCities = this.locations.filter(
          (location) =>
            location.location_type === "city" &&
            location.location_province_code === this.selectedProvince
        );
        this.selectedCity = null;
        this.filteredAreas = [];
      } else {
        this.filteredCities = [];
        this.selectedCity = null;
        this.filteredAreas = [];
      }
    },
    filterAreas() {
      if (this.selectedCity) {
        this.filteredAreas = this.locations.filter(
          (location) =>
            location.location_type === "district" &&
            location.location_city_code === this.selectedCity
        );
        this.selectedArea = null;
      } else {
        this.filteredAreas = [];
        this.selectedArea = null;
      }
    },
  },

  components: {
    Header,
    SideBar,
    SearchLocation,
    CreateLocation,
  },
};
</script>

<style>
.search {
  justify-content: center;
  display: flex;
}

.no-data-available {
  text-align: center;
  color: grey;
  font-size: small;
  margin-top: 15%;
}
</style>
