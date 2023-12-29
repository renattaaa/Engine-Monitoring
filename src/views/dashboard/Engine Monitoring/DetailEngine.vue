<template>
  <div>
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title style="color: #356859; font-weight: bold">
          Detail Engine
          <v-spacer></v-spacer>
          <button @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </button>
        </v-card-title>
        <v-card-text>
          <!-- Display detail data here -->
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="User"
                  v-model="dataEngine.user"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Project"
                  v-model="dataEngine.project"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="PIC"
                  v-model="dataEngine.pic"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Name"
                  v-model="dataEngine.name"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Location"
                  v-model="dataEngine.location"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Status"
                  v-model="dataEngine.status"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Run Command"
                  v-model="dataEngine.run_command"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Swagger Link"
                  v-model="dataEngine.swagger_link"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Kafka Topic"
                  v-model="dataEngine.kafka_topic"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Kafka Broker"
                  v-model="dataEngine.kafka_broker"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Notes"
                  v-model="dataEngine.notes"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Last Updated"
                  v-model="dataEngine.timestamp"
                  readonly
                ></v-text-field>
              </v-col>

              <v-row class="ma-4">
                <!-- form server -->
                <v-col cols="12" sm="6" md="6">
                  <h6>Server</h6>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        label="Server"
                        v-model="dataEngine.server"
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Port"
                        v-model="dataEngine.port"
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Server Password"
                        v-model="dataEngine.server_password"
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Server User"
                        v-model="dataEngine.server_user"
                        readonly
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
                        label="Haproxy"
                        v-model="dataEngine.haproxy"
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Haproxy Port"
                        v-model="dataEngine.haproxy_port"
                        readonly
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Button to open the detail dialog -->
    <button color="primary" text class="pa-2" @click="dialog = true">
      <v-icon small color="grey" dark>mdi-eye</v-icon>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    dataEngine: Object,
  },
  data() {
    return {
      dialog: false,
    };
  },
};
</script>

<style></style>
