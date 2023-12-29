<template>
  <div>
    <button color="primary" text class="pa-2" @click="triggerFileInput">
      <v-icon small color="grey" dark>mdi-pencil</v-icon>
    </button>

    <!-- Hidden file input -->
    <input
      type="file"
      ref="fileInput"
      style="display: none"
      @change="handleFileChange"
    />
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    dataDoc: Object,
    fetchDocument: Function,
  },
  data() {
    return {
      selectedFile: null,
    };
  },
  methods: {
    triggerFileInput() {
      // Programmatically trigger a click event on the file input
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
      // Auto-upload the file
      this.uploadFile();
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
        const response = await axios.put(
          `/api/document/update/${this.dataDoc.id}`,
          formData,
          config
        );

        this.fetchDocument();

        this.$toast.success("Successfully updated data!", {
          type: "success",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });

        console.log("Document updated successfully:", response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
        this.$toast.error("Failed to update data", {
          type: "error",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });
        console.error("Error updating document:", error);
        this.resetForm();
        this.success = false;
        this.error = true;
        this.loading = false;
      }
    },
  },
};
</script>

<style></style>
