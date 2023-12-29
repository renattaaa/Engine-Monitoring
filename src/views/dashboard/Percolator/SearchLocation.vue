<template>
  <div>
    <div data-aos="fade-right">
      <v-text-field
        rounded
        class="search"
        placeholder="Search"
        append-icon="mdi-magnify"
        v-model="query"
        solo
        @click:append="search"
        @keyup.enter="search"
      >
        <template v-slot:append>
          <v-icon v-if="query" @click="clearSearch">mdi-close</v-icon>
          <v-icon @click="search">mdi-magnify</v-icon>
        </template>
      </v-text-field>
    </div>

    <div v-if="locationData && locationData.length > 0" class="mt-8">
      <v-card-title> Search for "{{ query }}" </v-card-title>

      <v-list-item-group
        v-for="location in locationData"
        :key="location.id"
        flat
        data-aos="fade-down"
      >
        <router-link
          :to="`/percolator/${location.id}`"
          style="text-decoration: none"
        >
          <v-list-item>
            <v-list-item-title>{{ location.location_name }}</v-list-item-title>
            <v-list-item-subtitle class="mt-3">
              <p>Code: {{ location.id }}</p>
              <p>Coordinate: {{ location.location_coordinate }}</p>
              <p>Type: {{ location.location_type }}</p>
            </v-list-item-subtitle>
          </v-list-item>
          <v-divider></v-divider>
        </router-link>
      </v-list-item-group>

      <div class="text-center">
        <!-- Letakkan tombol "See More" di tengah -->
        <v-chip
          @click="loadMoreResults"
          v-if="showSeeMore"
          class="ma-4"
          color="primary"
        >
          See More <v-icon>mdi-chevron-down</v-icon>
        </v-chip>
      </div>
    </div>
    <div
      class="mt-6"
      v-else-if="search && locationData && locationData.length === 0"
    >
      <v-col>
        <p>Sorry, no data available</p>
      </v-col>
    </div>
    <div
      class="mt-6"
      v-if="loading && locationData.length === 0 && locationData.length > 0"
    >
      <v-col>
        <p>Searching...</p>
      </v-col>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      query: "",
      locationData: false,
      loading: false,
      resultLimit: 5,
      showSeeMore: false,
    };
  },
  methods: {
    search() {
      this.loading = true;
      this.error = false;
      axios
        .get(
          `/service-percolator/api/v1/percolator/locations?page=1&size=${this.resultLimit}&name=${this.query}`
        )
        .then((response) => {
          if (response.data.status === true) {
            this.locationData = response.data.data.data;
            console.log(response.data.data.data);
            if (response.data.data.data.length === this.resultLimit) {
              this.showSeeMore = true;
            } else {
              this.showSeeMore = false;
            }
          } else {
            this.locationData = [];
            this.showSeeMore = false;
          }
        })
        .catch((error) => {
          console.error(error);
          this.locationData = [];
          this.showSeeMore = false;
        });
    },
    clearSearch() {
      this.query = "";
      this.locationData = false;
      this.resultLimit = 5;
    },
    loadMoreResults() {
      this.resultLimit += 5;
      this.search();
    },
  },
};
</script>
<style>
.search {
  color: black;
  font-weight: 500;
  max-width: 30%;
  height: 30px;
}
</style>