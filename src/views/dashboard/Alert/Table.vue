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
        <b-button
          @click="dialog = true"
          pill
          class="btn-sm my-4 mx-auto ml-2"
          style="background-color: #356859; color: #fff; font-size: 12px"
        >
          New alert <v-icon small dark>mdi-plus</v-icon>
        </b-button>
        <v-dialog v-model="dialog" persistent max-width="600px">
          <v-card>
            <v-card-title style="color: #356859; font-weight: bold">
              Create alert
              <v-spacer></v-spacer>
              <button @click="dialog = false">
                <v-icon>mdi-close</v-icon>
              </button>
            </v-card-title>
            <v-card-text>
              <form @submit.prevent="createAlert">
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="dataAlerts.name"
                      label="Name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="dataAlerts.query"
                      label="Query"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="dataAlerts.type" label="Type">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="dataAlerts.url"
                      label="URL"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="dataAlerts.request"
                      label="Request"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="dataAlerts.client"
                      label="Client"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="dataAlerts.pic"
                      label="PIC"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="dataAlerts.source"
                      label="Source"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-card-actions>
                  <p class="ma-3" v-if="loading">Creating...</p>
                  <p class="ma-3" v-if="success" style="color: #356859">
                    Alert created
                  </p>
                  <p class="ma-3" v-if="error" style="color: red">
                    Failed to create alert
                  </p>
                  <v-spacer></v-spacer>
                  <v-btn class="mb-4" text color="#356859" type="submit">
                    Create alert
                  </v-btn>
                </v-card-actions>
              </form>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>

    <v-card elevation="6">
      <v-data-table
        style="white-space: nowrap"
        :headers="headers"
        :items="alerts"
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
            <td>{{ item.name }}</td>
            <td>{{ item.query }}</td>
            <td>{{ item.type }}</td>
            <td>{{ item.url }}</td>
            <td>{{ item.request }}</td>
            <td>{{ item.client }}</td>
            <td>{{ item.pic }}</td>
            <td>{{ item.source }}</td>
            <td>{{ item.timestamp }}</td>
            <td>
              <v-card-actions>
                <EditAlert
                  :dataAlerts="item"
                  :dataId="item.id"
                  :fetchAlerts="fetchAlerts"
                />
                <button text @click="deleteAlert(item.id)">
                  <v-icon small>mdi-delete</v-icon>
                </button>
              </v-card-actions>
            </td>
          </tr>
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
import axios from "axios";
import EditAlert from "@/views/dashboard/Alert/EditAlert.vue";
import * as animationData from "@/assets/animations/no-data.json";

export default {
  name: "Instagram",
  data() {
    return {
      alerts: [],
      dialog: false,
      loading: false,
      success: false,
      error: false,
      search: "",
      defaultOptions: {
        animationData: animationData.default,
      },
      dataAlerts: {
        name: "",
        query: "",
        type: "",
        url: "",
        request: "",
        client: "",
        pic: "",
        source: "",
        timestamp: "",
      },
      headers: [
        { text: "No", value: "id", sortable: false },
        { text: "Name", value: "name", sortable: false },
        { text: "Query", value: "query", sortable: false },
        { text: "Type", value: "type", sortable: false },
        { text: "URL", value: "url", sortable: false },
        { text: "Request", value: "request", sortable: false },
        { text: "Client", value: "client", sortable: false },
        { text: "PIC", value: "pic", sortable: false },
        { text: "Source", value: "source", sortable: false },
        { text: "Last Updated", value: "timestamp", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  mounted() {
    this.fetchAlerts();
  },
  methods: {
    fetchAlerts() {
      axios
        .get("/service-alert/alert", {
          page: 1,
          size: 10,
          sort: "ASC",
          // // id: "id",
          // // name: "name",
          // // type: "type",
          // // client: "client",
          // // pic: "pic",
          // // source: "source",
        })
        .then((response) => {
          this.alerts = response.data.data.data.map((alert) => {
            const timestampInMilliseconds = parseInt(alert.timestamp, 10);

            if (!isNaN(timestampInMilliseconds)) {
              const date = new Date(timestampInMilliseconds);

              // Format timestamp to yyyy-MM-dd HH:mm:ss
              alert.timestamp = date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              });
            } else {
              alert.timestamp = "Invalid Date";
            }

            return alert;
          });
          this.loading = false;
        })
        .catch((error) => {
          console.error("Error:", error);
          this.loading = false;
        });
    },
    async createAlert() {
      try {
        this.loading = true;
        this.success = false;
        this.error = false;
        const response = await axios.post(
          "/service-alert/alert",
          this.dataAlerts
        );

        this.$toast.success("Successfully created data!", {
          type: "success",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });

        this.fetchAlerts();

        console.log("Alert created successfully:", response.data);
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
        this.$toast.error("Failed created data", {
          type: "error",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });
        console.error("Error creating alert:", error);
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

    deleteAlert(id) {
      this.$swal
        .fire({
          title: "Delete alert",
          text: "Are you sure you want to delete this alert?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#356859",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            axios
              .delete(`/service-alert/alert/${id}`)
              .then(() => {
                this.$swal.fire({
                  title: "Deleted!",
                  text: "Successfully deleted data!",
                  icon: "success",
                  confirmButtonColor: "#356859",
                });

                // Reload data
                this.fetchAlerts();
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

    resetForm() {
      this.dataAlerts.name = "";
      this.dataAlerts.query = "";
      this.dataAlerts.type = "";
      this.dataAlerts.url = "";
      this.dataAlerts.request = "";
      this.dataAlerts.client = "";
      this.dataAlerts.pic = "";
      this.dataAlerts.source = "";
    },

    // showFullNotes(engines) {
    //   alert(engines.id);
    // },
  },
  components: {
    EditAlert,
  },
};
</script>

<style>
/* .read-more {
  color: rgb(23, 23, 255);
  cursor: pointer;
} */
</style>
