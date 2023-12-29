<template>
  <div>
    <v-row>
      <v-col class="text-left">
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
        <!-- START NEW DOCUMENT -->
        <input
          type="file"
          ref="fileInput"
          class="form-control"
          placeholder="Add new document"
          @change="handleFileChange"
        />
        <div>
          <b-button
            v-if="selectedFile"
            @click="uploadFile"
            pill
            class="btn-sm my-2 mx-auto ml-2"
            style="background-color: #356859; color: #fff; font-size: 12px"
          >
            Add document <v-icon small dark>mdi-plus</v-icon>
          </b-button>
        </div>
        <!-- END NEW DOCUMENT -->
      </v-col>
    </v-row>

    <v-card elevation="6">
      <v-data-table
        style="white-space: nowrap"
        :headers="headers"
        :items="documents"
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
            <td>{{ item.type }}</td>
            <td>{{ item.size }}</td>
            <td>{{ item.timestamp }}</td>
            <td>
              <v-card-actions>
                <EditDocument :dataDoc="item" :fetchDocument="fetchDocument" />
                <button text @click="deleteDocument(item.id)">
                  <v-icon small>mdi-delete</v-icon>
                </button>
              </v-card-actions>
            </td>
            <td>
              <button text @click="downloadFile(item)">
                <v-text style="color: grey; font-size: 12px">
                  Download
                  <v-icon small>mdi-download</v-icon>
                </v-text>
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
import EditDocument from "@/views/dashboard/Document/EditDocument.vue";
import * as animationData from "@/assets/animations/no-data.json";

export default {
  data() {
    return {
      documents: [],
      selectedFile: null,
      loading: false,
      success: false,
      error: false,
      search: "",
      activeFilter: "",
      filterOptions: "all",
      defaultOptions: {
        animationData: animationData.default,
      },
      dataDoc: {
        username: "",
        name: "",
        role: "",
        timestamp: "",
      },
      headers: [
        { text: "No", value: "id", sortable: false },
        { text: "Name", value: "name", sortable: false },
        { text: "Type", value: "type", sortable: false },
        { text: "Size", value: "size", sortable: false },
        { text: "Last Updated", value: "timestamp", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
        { text: "", value: "download", sortable: false },
      ],
    };
  },
  mounted() {
    this.fetchDocument();
  },
  methods: {
    downloadFile(item) {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      };

      axios
        .post(`/api/document/download/${item.id}`, {}, config)
        .then((response) => {
          const blob = new Blob([response.data], {
            type: "application/octet-stream",
          });

          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);

          const fileName = item.name;

          link.setAttribute("download", fileName);

          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(link.href);
        })
        .catch((error) => {
          console.error("Error downloading document", error);
          this.$toast.error("Failed to download document", {
            type: "error",
            position: "top-right",
            duration: 3000,
            dismissible: true,
          });
        });
    },

    fetchDocument() {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .post(
          "/api/document/data",
          {
            page: 1,
            size: 10,
            sort: "DESC",
            keyword: this.search,
            start_date: "all",
            end_date: "all",
          },
          config
        )
        .then((response) => {
          this.documents = response.data.data;
          this.loading = false;
        })
        .catch((error) => {
          console.error("Error:", error);
          this.loading = false;
        });
    },

    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    async uploadFile() {
      if (!this.selectedFile) {
        console.error("Please choose a file before uploading.");
        return;
      }

      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const formData = new FormData();
      formData.append("file", this.selectedFile);

      try {
        const response = await axios.post(
          "/api/document/add",
          formData,
          config
        );

        this.fetchDocument();

        this.$toast.success("Successfully created data!", {
          type: "success",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });

        console.log("Document created successfully:", response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
        this.$toast.error("Failed created data", {
          type: "error",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });
        console.error("Error creating document:", error);
        this.resetForm();
        this.success = false;
        this.error = true;
        this.loading = false;
      }
    },

    deleteDocument(id) {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      this.$swal
        .fire({
          title: "Delete Document",
          text: "Are you sure you want to delete this document?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#356859",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            axios
              .delete(`/api/document/delete/${id}`, config)
              .then(() => {
                this.$swal.fire({
                  title: "Deleted!",
                  text: "Successfully deleted data!",
                  icon: "success",
                  confirmButtonColor: "#356859",
                });

                // Reload data
                this.fetchDocument();
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

    // showFullNotes(engines) {
    //   alert(engines.id);
    // },
  },
  components: {
    EditDocument,
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
