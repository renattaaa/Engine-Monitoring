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

        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <b-button
              v-bind="attrs"
              v-on="on"
              icon
              pill
              class="btn-sm my-4 mx-auto"
              style="font-size: 12px"
            >
              Filter <v-icon small dark>mdi-filter-outline</v-icon>
            </b-button>
          </template>
          <v-list>
            <v-list-item
              @click="setFilter('all')"
              :class="{ 'active-filter': activeFilter === 'all' }"
            >
              <v-list-item-title>All</v-list-item-title>
            </v-list-item>
            <v-list-item
              @click="setFilter('0')"
              :class="{ 'active-filter': activeFilter === '0' }"
            >
              <v-list-item-title>Admin</v-list-item-title>
            </v-list-item>
            <v-list-item
              @click="setFilter('1')"
              :class="{ 'active-filter': activeFilter === '1' && 'UserEntity' }"
            >
              <v-list-item-title>User</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <!-- END FILTERING BY USER -->
        <!-- START NEW USER -->
        <b-button
          @click="dialog = true"
          pill
          class="btn-sm my-4 mx-auto ml-2"
          style="background-color: #356859; color: #fff; font-size: 12px"
        >
          New user <v-icon small dark>mdi-plus</v-icon>
        </b-button>
        <v-dialog v-model="dialog" persistent max-width="600px">
          <v-card>
            <v-card-title style="color: #356859; font-weight: bold">
              Create user
              <v-spacer></v-spacer>
              <button @click="dialog = false">
                <v-icon>mdi-close</v-icon>
              </button>
            </v-card-title>
            <v-card-text>
              <form @submit.prevent="createUser">
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="dataUsers.username"
                      label="Username"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="dataUsers.name"
                      label="Name"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-select
                      v-model="dataUsers.level"
                      :items="levelOptions"
                      label="Role"
                      required
                    >
                    </v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="dataUsers.password"
                      label="Password"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-card-actions>
                  <p class="ma-3" v-if="loading">Creating...</p>
                  <p class="ma-3" v-if="success" style="color: #356859">
                    User created
                  </p>
                  <p class="ma-3" v-if="error" style="color: red">
                    Failed to create user
                  </p>
                  <v-spacer></v-spacer>
                  <v-btn class="mb-4" text color="#356859" type="submit">
                    Create user
                  </v-btn>
                </v-card-actions>
              </form>
            </v-card-text>
          </v-card>
        </v-dialog>
        <!-- END NEW USER -->
      </v-col>
    </v-row>

    <v-card elevation="6">
      <v-data-table
        style="white-space: nowrap"
        :headers="headers"
        :items="users"
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
            <td>{{ item.username }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.role }}</td>
            <td>{{ item.timestamp }}</td>
            <td>
              <v-card-actions>
                <EditUser
                  :dataUsers="item"
                  :dataRole="item.role"
                  :fetchUsers="fetchUsers"
                />
                <button text @click="deleteUser(item.username)">
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
import EditUser from "@/views/dashboard/User Monitoring/EditUser.vue";
import * as animationData from "@/assets/animations/no-data.json";

export default {
  name: "Instagram",
  data() {
    return {
      users: [],
      dialog: false,
      loading: false,
      success: false,
      error: false,
      search: "",
      activeFilter: "",
      filterOptions: "all",
      defaultOptions: {
        animationData: animationData.default,
      },
      dataUsers: {
        username: "",
        name: "",
        role: "",
        timestamp: "",
      },
      headers: [
        { text: "No", value: "id", sortable: false },
        { text: "Username", value: "username", sortable: false },
        { text: "Name", value: "name", sortable: false },
        { text: "Role", value: "role", sortable: false },
        { text: "Last Updated", value: "timestamp", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
      levelOptions: [
        { text: "Admin", value: 0 },
        { text: "User", value: 1 },
      ],
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .post(
          "/api/user/data",
          {
            page: 1,
            size: 10,
            sort: "DESC",
            keyword: this.search,
            start_date: "all",
            end_date: "all",
            level: this.filterOptions,
          },
          config
        )
        .then((response) => {
          this.users = response.data.data;
          this.loading = false;
        })
        .catch((error) => {
          console.error("Error:", error);
          this.loading = false;
        });
    },
    async createUser() {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        this.loading = true;
        this.success = false;
        this.error = false;
        const response = await axios.post("/api/user/create", this.dataUsers, config);

        this.$toast.success("Successfully created data!", {
          type: "success",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });

        axios
          .post(
            "/api/user/data",
            {
              page: 1,
              size: 10,
              sort: "DESC",
              keyword: this.search,
              start_date: "all",
              end_date: "all",
              level: this.filterOptions,
            },
            config
          )
          .then((response) => {
            this.users = response.data.data;
            this.loading = false;
          })
          .catch((error) => {
            console.error("Error:", error);
            this.loading = false;
          });

        console.log("User created successfully:", response.data);
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
        console.error("Error creating user:", error);
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
      this.dataUsers.username = "";
      this.dataUsers.name = "";
      this.dataUsers.level = "";
      this.dataUsers.password = "";
    },

    deleteUser(username) {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      this.$swal
        .fire({
          title: "Delete User",
          text: "Are you sure you want to delete this user?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#356859",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            axios
              .delete(`/api/user/${username}`, config)
              .then(() => {
                this.$swal.fire({
                  title: "Deleted!",
                  text: "Successfully deleted data!",
                  icon: "success",
                  confirmButtonColor: "#356859",
                });

                // Reload data
                this.fetchUsers();
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
    setFilter(level) {
      if (this.activeFilter === level) {
        level = "all";
      }

      this.filterOptions = level;
      this.fetchUsers();
      this.activeFilter = level;
    },

    // showFullNotes(engines) {
    //   alert(engines.id);
    // },
  },
  components: {
    EditUser,
  },
};
</script>

<style>
/* .read-more {
  color: rgb(23, 23, 255);
  cursor: pointer;
} */
.active-filter {
  color: white;
  background-color: rgba(227, 235, 227, 0.771);
}
</style>
