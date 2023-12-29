<template>
  <v-card elevation="6">
    <v-subheader>
      <v-dialog scrollable max-width="600px" v-model="selectPlatform">
        <template v-slot:activator="{ on, attrs }">
          <v-text v-bind="attrs" v-on="on">
            <strong>Get platform</strong>
            <v-icon medium color="grey" dark> mdi-chevron-down </v-icon>
            <v-text v-if="source === 'instagram'"
              ><strong>Instagram</strong></v-text
            >
            <v-text v-if="source === 'whatsapp'"
              ><strong>Whatsapp</strong></v-text
            >
            <v-text v-if="source === 'twitter'"
              ><strong>Twitter</strong></v-text
            >
            <v-text v-if="source === 'facebook'"
              ><strong>Facebook</strong></v-text
            >
            <v-text v-if="source === 'tiktok'"><strong>Tiktok</strong></v-text>
            <v-text v-if="source === 'telegram'"
              ><strong>Telegram</strong></v-text
            >
          </v-text>
        </template>

        <v-card>
          <v-card-title style="color: #356859; font-weight: bold">
            Select platform
            <v-spacer></v-spacer>
            <button class="dialog-button" text @click="selectPlatform = false">
              <v-icon color="grey">mdi-close</v-icon>
            </button>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text style="height: 200px">
            <v-radio-group v-model="source" column @submit.prevent="fetchData">
              <v-radio label="Instagram" value="instagram"></v-radio>
              <v-radio label="Whatsapp" value="whatsapp"></v-radio>
              <v-radio label="Twitter" value="twitter"></v-radio>
              <v-radio label="Facebook" value="facebook"></v-radio>
              <v-radio label="Tiktok" value="tiktok"></v-radio>
              <v-radio label="Telegram" value="telegram"></v-radio>
            </v-radio-group>
          </v-card-text>
          <v-divider></v-divider>
        </v-card>
      </v-dialog>
      <v-spacer></v-spacer>
      <div v-if="source === 'instagram'"><EditAuth /></div>

      <div v-if="source === 'instagram'"><CreateInstagram :fetchAccounts="fetchAccounts" /></div>
      <div v-if="source === 'whatsapp'"><CreateWhatsapp /></div>
      <div v-if="source === 'twitter'"><CreateTwitter /></div>
      <div v-if="source === 'facebook'"><CreateFacebook :fetchAccounts="fetchAccounts"/></div>
      <div v-if="source === 'tiktok'"><CreateTiktok /></div>
      <div v-if="source === 'telegram'"><CreateTelegram /></div>
    </v-subheader>
    <v-divider></v-divider>

    <v-data-table v-if="!source">
      <template v-slot:no-data>
        <div class="text-center no-data-available">Select platform first</div>
      </template>
    </v-data-table>

    <!-- PLATFORM AREA -->
    <div v-if="source === 'instagram'">
      <Instagram />
    </div>
    <div v-if="source === 'whatsapp'">
      <Whatsapp />
    </div>
    <div v-if="source === 'twitter'">
      <Twitter />
    </div>
    <div v-if="source === 'facebook'">
      <Facebook />
    </div>
    <div v-if="source === 'tiktok'">
      <Tiktok />
    </div>
    <div v-if="source === 'telegram'">
      <Telegram />
    </div>
  </v-card>
</template>

<script>
import Instagram from "@/components/Platform/Instagram/Instagram";
import EditAuth from "@/components/Platform/Instagram/EditAuth";
import CreateInstagram from "@/components/Platform/Instagram/CreateInstagram";
import Whatsapp from "@/components/Platform/Whatsapp/Whatsapp.vue";
import CreateWhatsapp from "@/components/Platform/Whatsapp/CreateWhatsapp";
import Twitter from "@/components/Platform/Twitter/Twitter";
import CreateTwitter from "@/components/Platform/Twitter/CreateTwitter";
import Facebook from "@/components/Platform/Facebook/Facebook";
import CreateFacebook from "@/components/Platform/Facebook/CreateFacebook";
import Tiktok from "@/components/Platform/Tiktok/Tiktok";
import CreateTiktok from "@/components/Platform/Tiktok/CreateTiktok";
import Telegram from "@/components/Platform/Telegram/Telegram";
import CreateTelegram from "@/components/Platform/Telegram/CreateTelegram";
export default {
  data() {
    return {
      source: "",
      selectPlatform: false,
      NoDataAvailable: false,
      dialogSearch: false,
      instagram: null,
      whatsapp: null,
      twitter: null,
      facebook: null,
      tiktok: null,
      telegram: null,
    };
  },
  methods: {
    // fetchData() {
    //   this.dialogSearch = false;
    //   if (this.source) {
    //   } else {
    //   }
    // },
     fetchAccounts() {
      axios
        .post("/api/account/list", {
          page: "1",
          size: "all",
          sort: "DESC",
          source: this.source,
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
  },
  components: {
    Instagram,
    EditAuth,
    CreateInstagram,
    Whatsapp,
    CreateWhatsapp,
    Twitter,
    CreateTwitter,
    Facebook,
    CreateFacebook,
    Tiktok,
    CreateTiktok,
    Telegram,
    CreateTelegram,
  },
};
</script>

<style>
.no-data-available {
  text-align: center;
  color: grey;
  font-size: small;
  margin: 5%;
}
</style>