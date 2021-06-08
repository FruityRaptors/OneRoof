<template>
  <v-row justify="center">
    <v-dialog persistent max-width="600px" :value="true">
      <v-card>
        <v-card-title>
          <span v-if="this.assignee" class="text-h5"
            >This chore is currently assigned to: {{ this.assignee }}</span
          >
          <span v-else class="text-h5"
            >This chore is not currently assigned</span
          >
        </v-card-title>
        <v-container>
          <v-card>
            <v-card-title v-if="this.assignee">Assign Manually</v-card-title>
            <v-card-title v-else>Reassign Manually</v-card-title>
            <v-select
              :items="victims"
              label="new assignee"
              v-model="newAssignee"
            ></v-select>
            <v-btn
              v-if="this.newAssignee"
              @click="assignChoreAndClose"
              color="blue darken-1"
              text
            >
              Save
            </v-btn>
          </v-card>
          <v-divider horizontal></v-divider>
          <v-card>
            <v-card-title v-if="this.assignee"
              >Assign Automatically</v-card-title
            >
            <v-card-title v-else>Reassign Automatically</v-card-title>
            <v-btn text color="blue darken-1" @click="randomizeAssignee"
              >Roll the dice!</v-btn
            >
            <v-list-item-subtitle>The lucky winner is...</v-list-item-subtitle>
            <div v-if="this.newAssigneeRandom">
              <v-list-item-title>{{
                this.newAssigneeRandom
              }}</v-list-item-title>
              <v-btn @click="assignChoreAndClose" color="blue darken-1" text>
                Save
              </v-btn>
            </div>
          </v-card>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeAssignChoreModal">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "AssignChore",
  props: ["chore"],
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
      let newAssignee = "butt";
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