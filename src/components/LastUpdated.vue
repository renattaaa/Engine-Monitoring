<template>
  <div>
    <v-card elevation="6" data-aos="fade-right">
      <v-subheader
        >Last Updated Account by:
        <strong class="ml-2">{{ localStorageUsername }}</strong></v-subheader
      >
      <v-divider></v-divider>
      <v-data-table
        :headers="headersAll"
        :items="sortedAllData"
        fixed-header
        height="250"
      >
        <template v-slot:[`item.no`]="{ index }">
          <div style="white-space: nowrap">
            {{ index + 1 }}
          </div>
        </template>
        <template v-slot:[`item.source`]="{ item }">
          <div style="white-space: nowrap">
            <v-icon small v-if="item.source === 'Instagram'"
              >mdi-instagram</v-icon
            >
            <img
              src="@/assets/img/threads3.svg"
              alt=""
              v-if="item.source === 'Threads'"
              style="width: 15px; height: 15px"
            />
            <v-icon small v-if="item.source === 'Facebook'"
              >mdi-facebook</v-icon
            >
            {{ item.source }}
          </div>
        </template>
        <template v-slot:[`item.last_updated`]="{ item }">
          <div style="white-space: nowrap">
            {{ formatDate(item.last_updated) }}
          </div>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn @click="deleteItem(item)" icon>
            <v-icon small>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <v-row class="py-6" fluid data-aos="fade-left">
      <v-col md="6" sm="6">
        <v-card elevation="6">
          <v-subheader
            >Yesterday's Updates by:
            <strong class="ml-2">{{
              localStorageUsername
            }}</strong></v-subheader
          >
          <v-divider></v-divider>
          <v-data-table
            :headers="headers"
            :items="sortedYesterdayData"
            fixed-header
            height="250"
          >
            <template v-slot:[`item.no`]="{ index }">
              <div style="white-space: nowrap">
                {{ index + 1 }}
              </div>
            </template>
            <template v-slot:[`item.last_updated`]="{ item }">
              <div style="white-space: nowrap">
                {{ formatDate(item.last_updated) }}
              </div>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
      <v-col md="6" sm="6">
        <v-card elevation="6">
          <v-subheader
            >Today's Updates by:
            <strong class="ml-2">{{
              localStorageUsername
            }}</strong></v-subheader
          >
          <v-divider></v-divider>
          <v-data-table
            :headers="headers"
            :items="sortedTodayData"
            fixed-header
            height="250"
          >
            <template v-slot:[`item.no`]="{ index }">
              <div style="white-space: nowrap">
                {{ index + 1 }}
              </div>
            </template>
            <template v-slot:[`item.last_updated`]="{ item }">
              <div style="white-space: nowrap">
                {{ formatDate(item.last_updated) }}
              </div>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headersAll: [
        { text: "No", value: "no", sortable: false },
        { text: "email", value: "email", sortable: false },
        { text: "Source", value: "source", sortable: false },
        { text: "Last Updated", value: "last_updated", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
      headers: [
        { text: "No", value: "no", sortable: false },
        { text: "email", value: "email", sortable: false },
        { text: "Source", value: "source", sortable: false },
        { text: "Last Updated", value: "last_updated", sortable: false },
      ],
      sortedAllData: [],
      sortedYesterdayData: [],
      sortedTodayData: [],
    };
  },

  computed: {
    localStorageUsername() {
      return localStorage.getItem("username");
    },
  },

  created() {
    this.sortedAllData = this.sortDataByLastUpdated(
      this.getDataFromLocalStorage()
    );
    this.sortedYesterdayData = this.sortDataByLastUpdated(
      this.getDataFromLocalStorage().filter((user) => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const lastUpdated = new Date(user.last_updated);
        return lastUpdated.toDateString() === yesterday.toDateString();
      })
    );
    this.sortedTodayData = this.sortDataByLastUpdated(
      this.getDataFromLocalStorage().filter((user) => {
        const today = new Date();
        const lastUpdated = new Date(user.last_updated);
        return lastUpdated.toDateString() === today.toDateString();
      })
    );
  },

  methods: {
    formatDate(date) {
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      return new Date(date).toLocaleDateString("id-ID", options);
    },
    sortDataByLastUpdated(data) {
      return data.sort(
        (a, b) => new Date(b.last_updated) - new Date(a.last_updated)
      );
    },
    getDataFromLocalStorage() {
      const data = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("updatedAccount_")) {
          const updatedAccountJSON = localStorage.getItem(key);
          if (updatedAccountJSON) {
            const updatedAccount = JSON.parse(updatedAccountJSON);
            data.push(updatedAccount);
          }
        }
      }
      return data;
    },
    deleteItem(item) {
      // Find the index of the item in sortedAllData using the actual item ID
      const index = this.sortedAllData.findIndex((user) => user.id === item.id);

      // Remove the item from the array
      if (index !== -1) {
        this.sortedAllData.splice(index, 1);

        // Find the corresponding localStorage key using the actual item ID
        const localStorageKey = this.getLocalStorageKeyByItemId(item.id);

        // Optionally, you can also remove the item from localStorage
        if (localStorageKey) {
          localStorage.removeItem(localStorageKey);
        }
      }
    },

    getLocalStorageKeyByItemId(itemId) {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("updatedAccount_")) {
          const updatedAccountJSON = localStorage.getItem(key);
          if (updatedAccountJSON) {
            const updatedAccount = JSON.parse(updatedAccountJSON);
            // Check if the current item ID matches
            if (updatedAccount.id === itemId) {
              return key;
            }
          }
        }
      }
      return null; // Return null if the key is not found
    },
  },
};
</script>

<style></style>
