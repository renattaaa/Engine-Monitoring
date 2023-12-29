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
          v-if="level === '0'"
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
              <span class="ml-2"
                ><v-icon small color="primary">mdi-filter-variant</v-icon></span
              >
              <v-spacer></v-spacer>
              <button @click="dialogFilter = false">
                <v-icon>mdi-close</v-icon>
              </button>
            </v-card-title>
            <v-card-text>
              <v-autocomplete
                v-model="selectedUser"
                :items="engines.map((engine) => engine.user)"
                label="Select User"
              >
                <template v-slot:item="{ item }">
                  <v-list-item
                    @click="resetFilter(item)"
                    :class="{ 'selected-item': selectedUser === item }"
                  >
                    <v-list-item-content>
                      <v-list-item-title>{{ item }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-autocomplete>
            </v-card-text>
          </v-card>
        </v-dialog>
        <!-- END FILTERING BY USER -->
        <!-- START NEW ENGINE -->
        <b-button
          @click="dialogCreate = true"
          pill
          class="btn-sm my-4 mx-auto ml-2"
          style="background-color: #356859; color: #fff; font-size: 12px"
        >
          New engine <v-icon small dark>mdi-plus</v-icon>
        </b-button>
        <v-dialog v-model="dialogCreate" persistent max-width="600px">
          <v-card>
            <v-card-title style="color: #356859; font-weight: bold">
              Create engine
              <v-spacer></v-spacer>
              <button @click="dialogCreate = false">
                <v-icon>mdi-close</v-icon>
              </button>
            </v-card-title>
            <v-card-text>
              <form @submit.prevent="createEngine">
                <v-row class="ma-2" align="center" justify="center">
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      label="Project"
                      v-model="dataEngine.project"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      label="Name"
                      v-model="dataEngine.name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      label="Location"
                      v-model="dataEngine.location"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      label="Status"
                      v-model="dataEngine.status"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      label="Run Command"
                      v-model="dataEngine.run_command"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-select
                      label="Type"
                      :items="typeOptions"
                      v-model="dataEngine.type"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      label="Swagger Link"
                      v-model="dataEngine.swagger_link"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      label="Kafka Topic"
                      v-model="dataEngine.kafka_topic"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      label="Kafka Broker"
                      v-model="dataEngine.kafka_broker"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      label="Notes"
                      v-model="dataEngine.notes"
                    ></v-text-field>
                  </v-col>

                  <v-row class="ma-4">
                    <!-- form server -->
                    <v-col cols="12" sm="6" md="6">
                      <h6>Server</h6>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            placeholder="Server"
                            v-model="dataEngine.server"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            label="Port"
                            v-model="dataEngine.port"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            placeholder="Server User"
                            v-model="dataEngine.server_user"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            placeholder="Server Password"
                            v-model="dataEngine.server_password"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                    <!-- form haproxy -->
                    <v-col cols="12" sm="6" md="6">
                      <h6>Harpoxy</h6>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            placeholder="Haproxy"
                            v-model="dataEngine.haproxy"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            placeholder="Haproxy Port"
                            v-model="dataEngine.haproxy_port"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-row>
                <v-card-actions>
                  <p class="ma-3" v-if="loading">Creating...</p>
                  <p class="ma-3" v-if="success" style="color: #356859">
                    Engine created
                  </p>
                  <p class="ma-3" v-if="error" style="color: red">
                    Failed to create engine
                  </p>
                  <v-spacer></v-spacer>
                  <v-btn class="mb-4" text color="#356859" type="submit">
                    Create engine
                  </v-btn>
                </v-card-actions>
              </form>
            </v-card-text>
          </v-card>
        </v-dialog>
        <!-- END NEW ENGINE -->
      </v-col>
    </v-row>

    <v-card elevation="6">
      <v-data-table
        style="white-space: nowrap"
        :headers="headers"
        :items="filteredEngines"
        :items-per-page="10"
        :loading="loading"
        height="400"
        :fixed-header="true"
        :search="search"
        item-key="id"
      >
        <template v-slot:item="{ item, index }">
          <tr align="center">
            <td>{{ index + 1 }}</td>
            <td>{{ item.project }}</td>
            <td>{{ item.pic }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.server }}</td>
            <td>{{ item.port }}</td>
            <td>{{ item.server_user }}</td>
            <td>{{ item.server_password }}</td>
            <td>{{ item.status }}</td>
            <!-- <td v-if="item.id.length > 15">
              {{ item.id.slice(0, 15) }}
              <div>
                <span class="read-more" @click="showFullNotes(item)"
                  >Read More</span
                >
              </div>
            </td> -->
            <!-- <td v-else>{{ item.id }}</td> -->
            <!-- <td>{{ item.haproxy }}</td>
            <td>{{ item.haproxy_port }}</td>
            <td>{{ item.location }}</td>
            <td>{{ item.run_command }}</td>
            <td>{{ item.user }}</td>
            <td>{{ item.timestamp }}</td>
            <td>{{ item.notes }}</td> -->

            <td
              style="
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
              <DetailEngine :dataEngine="item" />
              <EditEngine :dataEngine="item" :dataId="item.id" />
              <button text @click="deleteEngine(item.id)">
                <v-icon small>mdi-delete</v-icon>
              </button>
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
import * as animationData from "@/assets/animations/no-data.json";
import DetailEngine from "@/views/dashboard/Engine Monitoring/DetailEngine.vue";
import EditEngine from "@/views/dashboard/Engine Monitoring/EditEngine.vue";

export default {
  name: "Engine Monitoring",
  data() {
    return {
      engines: [],
      dialogCreate: false,
      dialogFilter: false,
      loading: false,
      success: false,
      error: false,
      search: "",
      selectedUser: "all",
      defaultOptions: {
        animationData: animationData.default,
      },
      typeOptions: [
        { text: "Engine", value: "engine" },
        { text: "Service", value: "service" },
      ],
      dataEngine: {
        project: "",
        pic: "",
        name: "",
        server: "",
        port: "",
        server_user: "",
        server_password: "",
        haproxy: "",
        haproxy_port: "",
        status: "",
        type: "",
        location: "",
        run_command: "",
        swagger_link: "",
        kafka_topic: "",
        kafka_broker: "",
        notes: "",
        user_id: "",
      },
      headers: [
        { text: "No", align: "center", value: "id", sortable: false },
        { text: "Project", align: "center", value: "project", sortable: false },
        { text: "PIC", align: "center", value: "pic", sortable: false },
        { text: "Name", align: "center", value: "name", sortable: false },
        { text: "Server", align: "center", value: "server", sortable: false },
        { text: "Port", align: "center", value: "port", sortable: false },
        {
          text: "Server User",
          align: "center",
          value: "server_user",
          sortable: false,
        },
        {
          text: "Server Password",
          align: "center",
          value: "server_password",
          sortable: false,
        },
        { text: "Status", align: "center", value: "status", sortable: false },
        // { text: "Id", align: "center", value: "id", sortable: false },
        // { text: "Haproxy", align: "center", value: "haproxy", sortable: false },
        // { text: "Haproxy Port", align: "center", value: "haproxy_port", sortable: false },
        // { text: "Location", align: "center", value: "location", sortable: false },
        // { text: "Run Command", align: "center", value: "run_command", sortable: false },
        // { text: "User", align: "center", value: "user", sortable: false },
        // { text: "Timestamp", align: "center", value: "timestamp", sortable: false },
        // { text: "Notes", align: "center", value: "notes", sortable: false },
        {
          text: "Actions",
          align: "center",
          align: "center",
          value: "actions",
          sortable: false,
        },
      ],
    };
  },
  computed: {
    level() {
      return localStorage.getItem("level");
    },
    filteredEngines() {
      if (this.selectedUser === "all") {
        return this.engines;
      } else {
        return this.engines.filter(
          (engine) => engine.user === this.selectedUser
        );
      }
    },
  },
  mounted() {
    this.fetchEngines();
  },
  methods: {
    fetchEngines() {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .post(
          "/api/engine/data",
          {
            page: 1,
            size: 10,
            sort: "DESC",
            keyword: this.search,
            start_date: "all",
            end_date: "all",
            user: this.selectedUser,
            type: "all",
          },
          config
        )
        .then((response) => {
          this.engines = response.data.data;
          this.loading = false;
        })
        .catch((error) => {
          console.error("Error:", error);
          this.loading = false;
        });
    },
    async createEngine() {
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

        this.dataEngine.user_id = localStorage.getItem("username");
        const response = await axios.post(
          "/api/engine/create",
          this.dataEngine,
          config
        );

        this.$toast.success("Successfully created data!", {
          type: "success",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });

        this.fetchEngines();

        console.log("Engine created successfully:", response.data);
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
        console.error("Error creating engine:", error);
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
      this.dataEngine.project = "";
      this.dataEngine.name = "";
      this.dataEngine.server = "";
      this.dataEngine.port = "";
      this.dataEngine.notes = "";
      this.dataEngine.server_user = "";
      this.dataEngine.server_password = "";
      this.dataEngine.haproxy = "";
      this.dataEngine.haproxy_port = "";
      this.dataEngine.status = "";
      this.dataEngine.location = "";
      this.dataEngine.run_command = "";
      this.dataEngine.user_id = "";
    },
    resetFilter(selectedItem) {
      if (this.selectedUser === selectedItem) {
        this.selectedUser = "all";
      } else {
        this.selectedUser = selectedItem;
      }
    },
    deleteEngine(id) {
      this.$swal
        .fire({
          title: "Delete Engine",
          text: "Are you sure you want to delete this engine?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#356859",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            const token = localStorage.getItem("token");

            const config = {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            };
            axios
              .delete(`/api/engine/delete/${id}`, config)
              .then(() => {
                this.$swal.fire({
                  title: "Deleted!",
                  text: "Successfully deleted data!",
                  icon: "success",
                  confirmButtonColor: "#356859",
                });

                // Reload data
                this.fetchEngines();
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
    showFullNotes(engines) {
      alert(engines.id);
    },
  },
  components: {
    DetailEngine,
    EditEngine,
  },
};
</script>

<style scoped>
/* .read-more {
  color: rgb(23, 23, 255);
  cursor: pointer;
} */
.selected-item {
  color: white;
  background-color: rgba(227, 235, 227, 0.771);
}
</style>
