<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="orange lighten-2 black--text mt-6" rounded dark v-bind="attrs" v-on="on">
          Update Info
        </v-btn>
      </template>

      
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Update your username"
                  hint="What do your housemates call you?"
                  v-model="username"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Update Email Address (coming soon)"
                  hint="This feature is upcoming"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Update Password (coming soon)"
                  hint="This feature is upcoming"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="updateUsername">
            Save Changes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "UpdateUser",
  data: () => ({
    dialog: false,
    username: "",
  }),
  methods: {
    updateUsername() {
      this.$store.commit("setUsername", this.username);
      this.$emit("setProfilePageUsername", this.username);
      this.username = "";
      this.dialog = false;
    },
  },
};
</script>