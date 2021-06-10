<template>
  <v-row justify="center">
    <v-dialog persistent max-width="600px" :value="true">

      <v-card class="orange lighten-5">
        <v-card class="d-flex justify center text-center orange lighten-5" elevation="0">
          <v-card-title v-if="this.assignee"
            >Currently assigned to: {{ this.assignee }}</v-card-title
          >
          <v-card-title v-else
            >This chore is not currently assigned</v-card-title
          >
        </v-card>

        <v-container>
          <v-card elevation="0" class="orange lighten-5">
            <v-card-text class="text--primary" v-if="this.assignee">Assign Manually</v-card-text>
            <v-card-text class="text--primary" v-else>Reassign Manually</v-card-text>
            <v-select
              class="pa-2"
              :items="victims"
              label="new assignee"
              v-model="newAssignee"
            ></v-select>
            <v-btn
              v-if="this.newAssignee"
              @click="assignChoreAndClose"
              color="orange darken-3"
              text
            >
              Save
            </v-btn>
          </v-card>

          <v-divider></v-divider>

          <v-card elevation="0" class="orange lighten-5">

            <v-card-text 
            v-if="this.assignee"
            class="text--primary"
            >
            Assign Automatically
            </v-card-text>

            <v-card-text v-else class="text--primary">
            Reassign Automatically
            </v-card-text>

            <v-container class="text-center" v-if="!this.newAssigneeRandom">
              <v-btn text color="white" class="orange lighten-2" @click="randomizeAssignee"
                >Roll the dice!</v-btn
              >
            </v-container>
            <v-list-item-subtitle class="text-center">The lucky winner is...</v-list-item-subtitle>
         
            <div v-if="this.newAssigneeRandom" class="scroller">

              <VScrollin> {{ this.newAssigneeRandom }} </VScrollin>

              <v-btn @click="assignChoreAndClose" color="orange darken-3" class="mt-3 mb-3" text>
                Save
              </v-btn>

            </div>

          </v-card>

          
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="orange darken-3" text @click="closeAssignChoreModal">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import VScrollin from "vue-scrollin";

export default {
  name: "AssignChore",
  props: ["chore"],
  components: {
    VScrollin,
  },
  data() {
    return {
      users: [],
      victims: [],
      assignee: this.chore.assignee,
      newAssignee: "",
      newAssigneeRandom: "",
    };
  },
  mounted() {
    this.users = this.$store.state.usersInSameHouse;
    this.victims = [];
    for (let user of this.users) {
      this.victims.push(user.username);
    }
  },
  methods: {
    closeAssignChoreModal() {
      this.$emit("closeAssignModalPlease");
    },
    assignChoreAndClose() {
      let newAssignee = "";
      if (this.newAssignee) {
        newAssignee = this.newAssignee;
      } else if (this.newAssigneeRandom) {
        newAssignee = this.newAssigneeRandom;
      }
      this.$emit("assignChorePlease", newAssignee);
    },

    randomizeAssignee() {
      const options = this.victims;
      const limit = options.length;
      const winnerIndex = Math.floor(Math.random() * limit);
      this.newAssigneeRandom = options[winnerIndex];
    },
  },
};
</script>

<style>
.scroller {
  text-align: center;
}
.scroller-text {
  font-size:1.5em;
  text-transform:uppercase;
  font-family: 'Oswald', sans-serif;
}
</style>