<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="locations"
      :loading="loading"
      fixed-header
      height="400"
    >
      <template v-slot:items="props">
        <td>{{ props.item.no }}</td>
        <td>{{ props.item.location_code }}</td>
        <td>{{ props.item.location_name }}</td>
        <td>{{ props.item.location_coordinate }}</td>
        <td>{{ props.item.location_type }}</td>
        <td>{{ props.item.query.query_string.query }}</td>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-card-actions>
          <EditLocation :locationData="item" iconSize="small" />
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <button
                v-bind="attrs"
                v-on="on"
                text
                @click="DeleteLocation(item.id)"
              >
                <v-icon small>mdi-delete</v-icon>
              </button>
            </template>
            <span>Delete {{ item.location_name }}</span>
          </v-tooltip>
        </v-card-actions>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from "axios";
import EditLocation from "@/views/dashboard/Percolator/EditLocation.vue";
export default {
  data() {
    return {
      locations: [],
      page: 1,
      size: 10,
      totalData: 0,
      headers: [
        { text: "No", value: "no", sortable: false },
        { text: "Code", value: "location_code", sortable: false },
        { text: "Name", value: "location_name", sortable: false },
        { text: "Coordinate", value: "location_coordinate", sortable: false },
        { text: "Location Type", value: "location_type", sortable: false },
        { text: "Query", value: "query.query_string.query", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
      loading: true,
    };
  },
  created() {
    this.LocationData();
  },
  methods: {
    LocationData() {
      const params = {
        page: this.page,
        size: this.size,
        name: this.name,
        type: "city",
      };
      axios
        .get("/percolator-rta/api/v1/percolator/locations", {
          params,
        })
        .then((response) => {
          this.loading = false;
          if (response.data.status) {
            const newLocations = response.data.data.data.map((item, index) => {
              item.no = this.locations.length + index + 1;
              return item;
            });
            this.locations = this.locations.concat(newLocations);
            this.totalData = response.data.data.total;

            if (this.locations.length < this.totalData) {
              this.page++;
              this.LocationData();
            }
          } else {
            console.error(
              "Request failed with message:",
              response.data.message
            );
          }
        })
        .catch((error) => {
          this.loading = false;
          console.error("Error making the request:", error);
        });
    },
    DeleteLocation(itemId) {
      if (window.confirm("Delete this Location?")) {
        axios
          .delete(`/percolator-rta/api/v1/percolator/locations/${itemId}`)
          .then(() => {
            this.LocationData();
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    },
  },
  components: {
    EditLocation,
  },
};
</script>

<style>
.no-data-available {
  text-align: center;
  color: grey;
  font-size: small;
  padding: 5%;
}

.read-more {
  color: rgb(23, 23, 255);
  cursor: pointer;
}
</style>