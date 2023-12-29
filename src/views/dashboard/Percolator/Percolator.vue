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
          @click="dialogFilter = true"
          pill
          class="btn-sm my-4 mx-auto"
          style="font-size: 12px"
        >
          Filter <v-icon small dark>mdi-filter-outline</v-icon>
        </b-button>
        <v-dialog v-model="dialogFilter" persistent max-width="400">
          <v-card>
            <v-card-title style="color: #356859; font-weight: bold">
              Filter User
              <v-spacer></v-spacer>
              <button @click="dialogFilter = false">
                <v-icon>mdi-close</v-icon>
              </button>
            </v-card-title>
            <v-card-text>
              <v-autocomplete
                v-model="type"
                :items="['province', 'city', 'district']"
                label="Select Type"
              ></v-autocomplete>
            </v-card-text>
          </v-card>
        </v-dialog>
        <!-- END FILTERING BY USER -->
      </v-col>
    </v-row>

    <v-card>
      <v-data-table
        style="white-space: nowrap"
        :headers="headers"
        :items="filteredLocations"
        :items-per-page="10"
        :loading="loading"
        height="400"
        :fixed-header="true"
        :search="search"
        item-key="id"
      >
        <template v-slot:item="{ item, index }">
          <tr>
            <td>{{ index + 1 }}</td>
            <td>{{ item.location_code }}</td>
            <td>{{ item.location_name }}</td>
            <td>{{ item.location_coordinate }}</td>
            <td>{{ item.location_type }}</td>
            <td>{{ item.query.query_string.query }}</td>
            <td>
              <!-- <template v-slot:item.actions="{ item }">
                <v-card-actions>
                  <EditLocation :locationData="item" iconSize="small"/>
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
              </template> -->
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import EditLocation from "@/views/dashboard/Percolator/EditLocation.vue";
import axios from "axios";
export default {
  data() {
    return {
      locations: [],
      search: "",
      type: "province",
      dialogFilter: false,
      loading: false,
      headers: [
        { text: "No", value: "id", sortable: false },
        { text: "Code", value: "location_code", sortable: false },
        { text: "Name", value: "location_name", sortable: false },
        { text: "Coordinate", value: "location_coordinate", sortable: false },
        { text: "Location Type", value: "location_type", sortable: false },
        { text: "Query", value: "query.query_string.query", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  computed: {
    filteredLocations() {
      return this.locations.filter(
        (location) => location.location_type === this.type
      );
    },
  },

  created() {
    this.LocationData();
  },
  methods: {
    LocationData() {
      this.loading = true;
      axios
        .get(
          `/service-percolator/api/v1/percolator/locations?page=1&size=10&name=${this.search}&type=${this.type}`
        )
        .then((response) => {
          this.locations = response.data.data.data;
          this.loading = false;
        })
        .catch((error) => {
          console.error("Error:", error);
          this.loading = false;
        });
    },

    DeleteLocation(itemId) {
      if (window.confirm("Delete this Location?")) {
        axios
          .delete(`/service-percolator/api/v1/percolator/locations/${itemId}`)
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
td {
  white-space: nowrap;
}
</style>
