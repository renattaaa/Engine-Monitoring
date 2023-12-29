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
        <!-- START NEW USER -->
        <h4
          v-if="selectedSource === 'instagram'"
          class="font-weight-bold"
          style="color: #356859"
        >
          Instagram | <v-icon color="primary">mdi-instagram</v-icon>
        </h4>
        <!-- <EditAuth class="mr-2" v-if="selectedSource === 'instagram'" /> -->
        <CreateInstagram
          class="mr-2"
          v-if="selectedSource === 'instagram'"
          :fetchAccounts="fetchAccounts"
        />
        <h4
          v-if="selectedSource === 'threads'"
          class="font-weight-bold"
          style="color: #356859"
        >
          Threads |
          <img
            src="@/assets/img/threads2.svg"
            alt=""
            style="width: 25px; height: 25px"
          />
        </h4>
        <CreateThreads
          class="mr-2"
          v-if="selectedSource === 'threads'"
          :fetchAccounts="fetchAccounts"
        />
        <h4
          v-if="selectedSource === 'facebook'"
          class="font-weight-bold"
          style="color: #356859"
        >
          Facebook | <v-icon color="primary">mdi-facebook</v-icon>
        </h4>
        <CreateFacebook
          class="mr-2"
          v-if="selectedSource === 'facebook'"
          :fetchAccounts="fetchAccounts"
        />
        <h4
          v-if="selectedSource === 'whatsapp'"
          class="font-weight-bold"
          style="color: #356859"
        >
          Whatsapp | <v-icon color="primary">mdi-whatsapp</v-icon>
        </h4>
        <h4
          v-if="selectedSource === 'twitter'"
          class="font-weight-bold"
          style="color: #356859"
        >
          Twitter | <v-icon color="primary">mdi-twitter</v-icon>
        </h4>
        <h4
          v-if="selectedSource === 'telegram'"
          class="font-weight-bold"
          style="color: #356859"
        >
          Telegram | <v-icon color="primary">mdi-telegram</v-icon>
        </h4>
        <!-- END NEW USER -->

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
              Platform <v-icon small dark>mdi-menu-down</v-icon>
            </b-button>
          </template>
          <v-list>
            <v-list-item
              @click="setFilter('instagram')"
              :class="{ 'active-filter': activeFilter === 'instagram' }"
            >
              <v-list-item-title> Instagram </v-list-item-title>
            </v-list-item>
            <v-list-item
              @click="setFilter('threads')"
              :class="{ 'active-filter': activeFilter === 'threads' }"
            >
              <v-list-item-title> Threads </v-list-item-title>
            </v-list-item>
            <v-list-item
              @click="setFilter('facebook')"
              :class="{ 'active-filter': activeFilter === 'facebook' }"
            >
              <v-list-item-title> Facebook </v-list-item-title>
            </v-list-item>

            <v-list-item
              @click="setFilter('whatsapp')"
              :class="{ 'active-filter': activeFilter === 'whatsapp' }"
            >
              <v-list-item-title> Whatsapp </v-list-item-title>
            </v-list-item>
            <v-list-item
              @click="setFilter('twitter')"
              :class="{ 'active-filter': activeFilter === 'twitter' }"
            >
              <v-list-item-title x> Twitter </v-list-item-title>
            </v-list-item>
            <v-list-item
              @click="setFilter('telegram')"
              :class="{ 'active-filter': activeFilter === 'telegram' }"
            >
              <v-list-item-title> Telegram </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <!-- END FILTERING BY USER -->
      </v-col>
    </v-row>

    <v-card elevation="6">
      <!-- INSTAGRAM -->
      <v-data-table
        v-if="selectedSource === 'instagram'"
        style="white-space: nowrap"
        :headers="getHeaders()"
        :items="users"
        :items-per-page="10"
        :loading="loading"
        height="400"
        :fixed-header="true"
        :search="search"
        item-key="id"
      >
        <template v-slot:item="{ item, index }">
          <tr v-if="selectedSource === 'instagram'">
            <td>{{ index + 1 }}</td>
            <!-- <td>{{ item.id }}</td> -->
            <td>{{ item.username }}</td>
            <td>{{ item.password }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.email_password }}</td>
            <td>{{ item.status }}</td>
            <td>{{ item.has_threads ? "Yes" : "No" }}</td>
            <td>{{ item.notes }}</td>
            <td>
              <v-card-actions>
                <EditInstagram
                  :accountData="item"
                  :fetchAccounts="fetchAccounts"
                />
                <button text @click="deleteInstagram(item.id)">
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
      <!-- INSTAGRAM -->

      <!-- THREADS -->
      <v-data-table
        v-else-if="selectedSource === 'threads'"
        style="white-space: nowrap"
        :headers="getHeaders()"
        :items="users"
        :items-per-page="10"
        :loading="loading"
        height="400"
        :fixed-header="true"
        :search="search"
        item-key="id"
      >
        <template v-slot:item="{ item, index }">
          <tr v-if="selectedSource === 'threads'">
            <td>{{ index + 1 }}</td>
            <!-- <td>{{ item.id }}</td> -->
            <td>{{ item.username }}</td>
            <td>{{ item.password }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.email_password }}</td>
            <td>{{ item.phone }}</td>
            <td>{{ item.status }}</td>
            <td>{{ item.has_threads ? "Yes" : "No" }}</td>
            <td>{{ item.notes }}</td>
            <td>
              <v-card-actions>
                <EditThreads
                  :accountData="item"
                  :fetchAccounts="fetchAccounts"
                />
                <button text @click="deleteInstagram(item.id)">
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
      <!-- THREADS -->

      <!-- FACEBOOK -->
      <v-data-table
        v-else-if="selectedSource === 'facebook'"
        style="white-space: nowrap"
        :headers="getHeaders()"
        :items="users"
        :items-per-page="10"
        :loading="loading"
        height="400"
        :fixed-header="true"
        :search="search"
        item-key="id"
      >
        <template v-slot:item="{ item, index }">
          <tr v-if="selectedSource === 'facebook'">
            <td>{{ index + 1 }}</td>
            <!-- <td>{{ item.id }}</td> -->
            <td>{{ item.email }}</td>
            <td>{{ item.password }}</td>
            <td>{{ item.phone_number }}</td>
            <td>{{ item.password_email }}</td>
            <td>{{ item.status }}</td>
            <!-- <td v-if="item.note.length > 30" style="white-space: nowrap">
              {{ item.note.slice(0, 30) }}...
              <div>
                <span class="read-more" @click="showFullNotes(item)"
                  >Read More</span
                >
              </div>
            </td> -->
            <td>
              {{ item.note }}
            </td>
            <td>
              <v-card-actions>
                <EditFacebook
                  :accountData="item"
                  :accountId="item.id"
                  :fetchAccounts="fetchAccounts"
                />
                <button text @click="deleteFacebook(item.id)">
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
      <!-- FACEBOOK -->

      <!-- WHATSAPP -->
      <v-data-table
        v-else-if="selectedSource === 'whatsapp'"
        style="white-space: nowrap"
        :headers="getHeaders()"
        :items="users"
        :items-per-page="10"
        :loading="loading"
        height="400"
        :fixed-header="true"
        :search="search"
        item-key="id"
      >
        <template v-slot:item="{ item, index }">
          <tr v-if="selectedSource === 'whatsapp'">
            <td>{{ index + 1 }}</td>
            <!-- <td>{{ item.id }}</td> -->
            <td>{{ item.email }}</td>
            <td>{{ item.phone_number }}</td>
            <td>{{ item.note }}</td>
            <td>
              <v-card-actions> </v-card-actions>
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
      <!-- WHATSAPP -->

      <!-- TWITTER -->
      <v-data-table
        v-else-if="selectedSource === 'twitter'"
        style="white-space: nowrap"
        :headers="getHeaders()"
        :items="users"
        :items-per-page="10"
        :loading="loading"
        height="400"
        :fixed-header="true"
        :search="search"
        item-key="id"
      >
        <template v-slot:item="{ item, index }">
          <tr v-if="selectedSource === 'twitter'">
            <td>{{ index + 1 }}</td>
            <!-- <td>{{ item.id }}</td> -->
            <td>{{ item.email }}</td>
            <td>{{ item.phone_number }}</td>
            <td>{{ item.note }}</td>
            <td>
              <v-card-actions> </v-card-actions>
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
      <!-- TWITTER -->

      <!-- TELEGRAM -->
      <v-data-table
        v-else-if="selectedSource === 'telegram'"
        style="white-space: nowrap"
        :headers="getHeaders()"
        :items="users"
        :items-per-page="10"
        :loading="loading"
        height="400"
        :fixed-header="true"
        :search="search"
        item-key="id"
      >
        <template v-slot:item="{ item, index }">
          <tr v-if="selectedSource === 'telegram'">
            <td>{{ index + 1 }}</td>
            <!-- <td>{{ item.id }}</td> -->
            <td>{{ item.email }}</td>
            <td>{{ item.phone_number }}</td>
            <td>{{ item.note }}</td>
            <td>
              <v-card-actions> </v-card-actions>
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
      <!-- TELEGRAM -->

      <!-- DEFAULT -->
      <v-data-table
        v-else
        :headers="getHeaders()"
        style="white-space: nowrap"
        :loading="loading"
        height="400"
        :fixed-header="true"
      >
        <template v-slot:no-data>
          <div>
            <Lottie
              :options="defaultOptions"
              :width="250"
              :height="250"
              class="center"
            />
            <h6 class="text-center">Choose the platform first!</h6>
          </div>
        </template>
      </v-data-table>
      <!-- DEFAULT -->
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import CreateInstagram from "@/components/Platform/Instagram/CreateInstagram";
import CreateFacebook from "@/components/Platform/Facebook/CreateFacebook";
import CreateThreads from "@/components/Platform/Threads/CreateThreads";
import EditAuth from "@/components/Platform/Instagram/EditAuth";
import EditInstagram from "@/components/Platform/Instagram/EditInstagram";
import EditThreads from "@/components/Platform/Threads/EditThreads";
import EditFacebook from "@/components/Platform/Facebook/EditFacebook";
import * as animationData from "@/assets/animations/no-data.json";

export default {
  name: "Instagram",
  components: {
    CreateInstagram,
    CreateFacebook,
    CreateThreads,
    EditAuth,
    EditInstagram,
    EditThreads,
    EditFacebook,
    EditThreads,
  },
  data() {
    return {
      users: [],
      dialog: false,
      loading: false,
      success: false,
      error: false,
      search: "",
      selectedSource: "instagram",
      activeFilter: null,
      defaultOptions: {
        animationData: animationData.default,
      },
    };
  },
  mounted() {
    this.fetchAccounts();
  },
  methods: {
    fetchAccounts() {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .post(
          "/api/account/list",
          {
            page: 1,
            size: "all",
            sort: "DESC",
            source: this.selectedSource,
            keyword: this.search,
            status: "all",
          },
          config
        )
        .then((response) => {
          this.users = response.data.data.data;
          this.loading = false;
        })
        .catch((error) => {
          console.error("Error:", error);
          this.loading = false;
        });
    },

    // START DELETE
    deleteInstagram(id) {
      this.$swal
        .fire({
          title: "Delete user",
          text: "Are you sure you want to delete this user?",
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
              .delete(`/api/account/delete/${id}`, config)
              .then(() => {
                this.$swal.fire({
                  title: "Deleted!",
                  text: "Successfully deleted data!",
                  icon: "success",
                  confirmButtonColor: "#356859",
                });

                this.fetchAccounts();
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

    deleteFacebook(id) {
      this.$swal
        .fire({
          title: "Delete user",
          text: "Are you sure you want to delete this user?",
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
              .delete(`/api/account/delete-account-fb?id_account=${id}`, config)
              .then(() => {
                this.$swal.fire({
                  title: "Deleted!",
                  text: "Successfully deleted data!",
                  icon: "success",
                  confirmButtonColor: "#356859",
                });

                this.fetchAccounts();
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
    // END DELETE

    setFilter(source) {
      this.selectedSource = source;
      this.fetchAccounts();
      this.activeFilter = source;
    },

    getHeaders() {
      if (this.selectedSource === "instagram") {
        return [
          { text: "No", value: "id", sortable: false },
          // { text: "ID", value: "id", sortable: false },
          { text: "Username", value: "username", sortable: false },
          { text: "Password", value: "password", sortable: false },
          { text: "Email", value: "email", sortable: false },
          { text: "Email Password", value: "email_password", sortable: false },
          { text: "Status", value: "status", sortable: false },
          { text: "Has Threads", value: "has_threads", sortable: false },
          { text: "Note", value: "notes", sortable: false },
          { text: "Actions", value: "actions", sortable: false },
        ];
      } else if (this.selectedSource === "threads") {
        return [
          { text: "No", value: "id", sortable: false },
          // { text: "ID", value: "id", sortable: false },
          { text: "Username", value: "username", sortable: false },
          { text: "Password", value: "password", sortable: false },
          { text: "Email", value: "email", sortable: false },
          { text: "Email Password", value: "email_password", sortable: false },
          { text: "Phone Number", value: "phone", sortable: false },
          { text: "Status", value: "status", sortable: false },
          { text: "Has Threads", value: "has_threads", sortable: false },
          { text: "Note", value: "notes", sortable: false },
          { text: "Actions", value: "actions", sortable: false },
        ];
      } else if (this.selectedSource === "facebook") {
        return [
          { text: "No", value: "id", sortable: false },
          // { text: "ID", value: "id", sortable: false },
          { text: "Email", value: "email", sortable: false },
          { text: "Password", value: "password", sortable: false },
          { text: "Phone Number", value: "phone_number", sortable: false },
          { text: "Password Email", value: "password_email", sortable: false },
          { text: "Status", value: "status", sortable: false },
          { text: "Note", value: "note", sortable: false },
          { text: "Actions", value: "actions", sortable: false },
        ];
      } else if (this.selectedSource === "whatsapp") {
        return [
          { text: "No", value: "id", sortable: false },
          // { text: "ID", value: "id", sortable: false },
          { text: "Email", value: "email", sortable: false },
          { text: "Phone Number", value: "phone_number", sortable: false },
          { text: "Note", value: "note", sortable: false },
          { text: "Actions", value: "actions", sortable: false },
        ];
      } else if (this.selectedSource === "twitter") {
        return [
          { text: "No", value: "id", sortable: false },
          // { text: "ID", value: "id", sortable: false },
          { text: "Email", value: "email", sortable: false },
          { text: "Phone Number", value: "phone_number", sortable: false },
          { text: "Note", value: "note", sortable: false },
          { text: "Actions", value: "actions", sortable: false },
        ];
      } else if (this.selectedSource === "telegram") {
        return [
          { text: "No", value: "id", sortable: false },
          // { text: "ID", value: "id", sortable: false },
          { text: "Email", value: "email", sortable: false },
          { text: "Phone Number", value: "phone_number", sortable: false },
          { text: "Note", value: "note", sortable: false },
          { text: "Actions", value: "actions", sortable: false },
        ];
      } else {
        // default headers when source is "all" or any other value
        return [{ text: "Get platform", sortable: false }];
      }
    },

    // showFullNotes(engines) {
    //   alert(engines.note);
    // },
  },
};
</script>

<style>
.read-more {
  color: rgb(23, 23, 255);
  cursor: pointer;
}
.active-filter {
  color: white;
  background-color: rgba(227, 235, 227, 0.771);
}
</style>
