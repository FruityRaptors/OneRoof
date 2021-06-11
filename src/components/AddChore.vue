<template>
  <v-row justify="center" class="mt-5">
    <v-dialog v-model="dialog" persistent max-width="600px">

      <template v-slot:activator="{ on, attrs }">
        <v-btn color="orange lighten-1" dark v-bind="attrs" v-on="on">
          Add a Chore
        </v-btn>
      </template>


      <v-card class="orange lighten-5">

         <v-card class="d-flex justify-center orange lighten-5" elevation="0">
             <v-card-title>
              Chore info
             </v-card-title>
         </v-card>
       
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
                  label="Assignee"
                  v-model="chore.assignee"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="orange darken-4" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="orange darken-4" text @click="pushChore"> Save </v-btn>
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
      assignee: "Everyone",
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