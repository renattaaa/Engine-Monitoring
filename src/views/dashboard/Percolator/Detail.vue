<template >
  <v-app v-if="isLogin" style="background-color: #efefef">
    <v-card-title class="pa-4">
      <router-link to="/percolator" style="text-decoration: none"
        ><v-icon>mdi-arrow-left</v-icon></router-link
      >
      <v-spacer></v-spacer>
      <CreateLocation />
      <EditLocation :locationData="locations" iconSize="default" />
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <button
            v-bind="attrs"
            v-on="on"
            text
            @click="DeleteLocation(locations.id)"
          >
            <v-icon>mdi-delete</v-icon>
          </button>
        </template>
        <span>Delete {{ locations.location_name }}</span>
      </v-tooltip>
    </v-card-title>
    <div>
      <v-row align="center" justify="center">
        <v-col cols="12" align="center" justify="center">
          <div>
            <h1 style="color: #356859">{{ locations.location_name }}</h1>
          </div>
          <v-chip class="ma-3">ID: {{ locations.id }}</v-chip>
          <v-chip class="ma-3"
            >Coordinate: {{ locations.location_coordinate }}</v-chip
          >
          <v-chip class="ma-3">Type: {{ locations.location_type }}</v-chip>
        </v-col>
      </v-row>
      <v-row class="ma-3" align="center" justify="center">
        <v-col cols="12" md="3">
          <v-card outlined class="card-item">
            <v-card-title style="font-weight: bold">Country</v-card-title>
            <v-card-text>
              Country Code: {{ locations.location_country_code }}
            </v-card-text>
            <v-card-text>
              Country Name: {{ locations.location_country_name }}
            </v-card-text>
            <v-card-text>
              Country Coordinate: {{ locations.location_country_coordinate }}
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card outlined class="card-item">
            <v-card-title style="font-weight: bold">Province</v-card-title>
            <v-card-text>
              Province Code: {{ locations.location_province_code }}
            </v-card-text>
            <v-card-text>
              Province Name: {{ locations.location_province_name }}
            </v-card-text>
            <v-card-text>
              Province Coordinate: {{ locations.location_province_coordinate }}
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card outlined class="card-item">
            <v-card-title style="font-weight: bold">City</v-card-title>
            <v-card-text>
              City Code: {{ locations.location_city_code }}
            </v-card-text>
            <v-card-text>
              City Name: {{ locations.location_city_name }}
            </v-card-text>
            <v-card-text>
              City Coordinate: {{ locations.location_city_coordinate }}
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card outlined class="card-item">
            <v-card-title style="font-weight: bold">District</v-card-title>
            <v-card-text>
              District Code: {{ locations.location_district_code }}
            </v-card-text>
            <v-card-text>
              District Name: {{ locations.location_district_name }}
            </v-card-text>
            <v-card-text>
              District Coordinate: {{ locations.location_district_coordinate }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
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
import CreateLocation from "./CreateLocation.vue";
import EditLocation from "./EditLocation.vue";
export default {
  data() {
    return {
      username: "",
      isLogin: false,
      dialog: true,
      locations: {},
    };
  },
  mounted() {
    this.fetchLocation(this.$route.params.id);
  },
  watch: {
    "$route.params.id": {
      handler() {
        this.fetchLocation(this.$route.params.id);
      },
      immediate: true,
    },
  },
  methods: {
    async fetchLocation(locationId) {
      this.locations = {}; // Inisialisasi locations sebelum permintaan
      axios
        .get(`/service-percolator/api/v1/percolator/locations/${locationId}`)
        .then((response) => {
          this.locations = response.data.data;
        })
        .catch((error) => {
          console.error("Terjadi kesalahan:", error);
        });
    },
    DeleteLocation(Id) {
      if (window.confirm("Delete this Location?")) {
        axios
          .delete(`/service-percolator/api/v1/percolator/locations/${Id}`)
          .then(() => {
            this.LocationData();
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    },
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
  },

  components: {
    CreateLocation,
    EditLocation,
  },
};
</script>

<style scoped>
.card-item {
  height: 100%;
  margin: 10px;
}
</style>
