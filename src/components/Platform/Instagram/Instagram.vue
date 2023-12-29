<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="accounts"
      :items-per-page="10"
      :loading="loading"
      height="400"
      :fixed-header="true"
    >
      <template v-slot:item="{ item, index }">
        <tr>
          <td>{{ index + 1 }}</td>
          <td>{{ item.id }}</td>
          <td>{{ item.username }}</td>
          <td>{{ item.password }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.email_password }}</td>
          <td>{{ item.status }}</td>
          <td>{{ item.has_threads ? "Yes" : "No" }}</td>
          <td v-if="item.notes.length > 15" style="white-space: nowrap">
            {{ item.notes.slice(0, 15) }}
            <div>
              <span class="read-more" @click="showFullNotes(item)"
                >Read More</span
              >
            </div>
          </td>
          <td v-else>{{ item.notes }}</td>
          <td>
            <v-card-actions>
              <EditInstagram
                :accountData="item"
                :fetchAccounts="fetchAccounts"
              />
              <button text @click="deleteAccount(item.id)">
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
  </div>
</template>

<script>
import axios from "axios";
import * as animationData from "@/assets/animations/no-data.json";
import EditInstagram from "@/components/Platform/Instagram/EditInstagram.vue";

export default {
  name: "Instagram",
  data() {
    return {
      accounts: [],
      loading: true,
      defaultOptions: {
        animationData: animationData.default,
      },
      headers: [
        { text: "No", value: "id", sortable: false },
        { text: "ID", value: "id", sortable: false },
        { text: "Username", value: "username", sortable: false },
        { text: "Password", value: "password", sortable: false },
        { text: "Email", value: "email", sortable: false },
        { text: "Email Password", value: "email_password", sortable: false },
        { text: "Status", value: "status", sortable: false },
        { text: "Has Threads", value: "has_threads", sortable: false },
        { text: "Note", value: "notes", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  mounted() {
    this.fetchAccounts();
  },
  methods: {
    fetchAccounts() {
      axios
        .post("/api/account/list", {
          page: "1",
          size: "all",
          sort: "DESC",
          source: "instagram",
          keyword: "all",
          status: "all",
        })
        .then((response) => {
          this.accounts = response.data.data.data;
          this.loading = false;
        })
        .catch((error) => {
          console.error("Error:", error);
          this.loading = false;
        });
    },
    deleteAccount(id) {
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
            axios
              .delete(`/api/account/delete/${id}`)
              .then(() => {
                this.$swal.fire({
                  title: "Deleted!",
                  text: "Successfully deleted data!",
                  icon: "success",
                  confirmButtonColor: "#356859",
                });
                
                axios
                  .post("/api/account/list", {
                    page: "1",
                    size: "all",
                    sort: "DESC",
                    source: "instagram",
                    keyword: "all",
                    status: "all",
                  })
                  .then((response) => {
                    this.accounts = response.data.data.data;
                    this.loading = false;
                  })
                  .catch((error) => {
                    console.error("Error:", error);
                    this.loading = false;
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

    showFullNotes(account) {
      alert(account.notes);
    },
  },
  components: {
    EditInstagram,
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
