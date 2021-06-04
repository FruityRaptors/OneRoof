<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Add a Chore
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Chore info</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Chore name"
                  v-model="chore.chore"
                  required
                ></v-text-field>
              </v-col>
              <br>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="chore.description"
                  label="Describe your chore"
                  clearable
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="victims"
                  label="Asignee"
                  v-model="chore.asignee"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="pushChore"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    users: [],
    victims: [],
    chore: {
      chore: "",
      description: "",
      asignee: "",
    },
  }),
  mounted() {
    this.users = this.$store.state.usersInSameHouse;
    this.victims = [];
    for (let user of this.users) {
      this.victims.push(user.username);
    }
  },
  methods: {
    pushChore() {
      this.$emit("addThisChorePlease", this.chore);
      this.chore = {};
      this.dialog = false;
    },
  },
};
</script>