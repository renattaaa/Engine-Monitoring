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
          <td>{{ item.email }}</td>
          <td>{{ item.password }}</td>
          <td>{{ item.phone_number }}</td>
          <td>{{ item.password_email }}</td>
          <td>{{ item.status }}</td>
          <td v-if="item.note.length > 16" style="white-space: nowrap">
            {{ item.note.slice(0, 16) }}...
            <div>
              <span class="read-more" @click="showFullNotes(item)"
                >Read More</span
              >
            </div>
          </td>
          <td v-else>
            {{ item.note }}
          </td>
          <td>
            <v-card-actions>
              <EditFacebook :accountData="item" :accountId="item.id" />
              <button text @click="deleteAccount(item.id)">
                <v-icon small>mdi-delete</v-icon>
              </button>
            </v-card-actions>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>


<script>
import axios from "axios";
import EditFacebook from "@/components/Platform/Facebook/EditFacebook";

export default {
  name: "Instagram",
  data() {
    return {
      accounts: [],
      loading: true,
      headers: [
        { text: "No", value: "id", sortable: false },
        { text: "ID", value: "id", sortable: false },
        { text: "Email", value: "email", sortable: false },
        { text: "Password", value: "password", sortable: false },
        { text: "Phone Number", value: "phone_number", sortable: false },
        { text: "Password Email", value: "password_email", sortable: false },
        { text: "Status", value: "status", sortable: false },
        { text: "Note", value: "note", sortable: false },
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
          source: "facebook",
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
      if (window.confirm("Delete this account?")) {
        axios
          .delete(
            `/api/account/delete-account-fb?id_account=${id}`
          )
          .then(() => {
            this.$toast.success("Successfully deleted data!", {
              type: "success",
              position: "top-right",
              duration: 3000,
              dismissible: true,
            });
            //reload data
            axios
              .post("/api/account/list", {
                page: "1",
                size: "all",
                sort: "DESC",
                source: "whatsapp",
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
            this.$toast.error("Failed deleted data", {
              type: "error",
              position: "top-right",
              duration: 3000,
              dismissible: true,
            });
            console.error("Error:", error);
          });
      }
    },
    showFullNotes(account) {
      alert(account.note);
    },
  },
  components: {
    EditFacebook,
  },
};
</script>


<style>
.no-data-available {
  text-align: center;
  color: grey;
  font-size: small;
  padding: 2%;
}
</style>