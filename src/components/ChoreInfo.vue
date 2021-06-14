<template>

  <v-dialog :value="true">

    <v-card class="mx-auto orange lighten-5 text-center" >

      
        <v-card-text class="display-1 text--primary pt-4">{{ this.chore.chore }}</v-card-text>

        <v-card-text class="pl-3">
          {{ this.chore.description }}
        </v-card-text>

        <v-container class="ml-5" v-if="this.chore.assignee != 'Everyone'">

        <v-avatar size="150" class="mr-10">
        <Avatar
            v-if="this.chore.assigneeURL === 'null'"
            :username="this.chore.assignee"
            :size="80"
          />
          <v-img v-else :src="this.chore.assigneeURL" ></v-img>
        </v-avatar>
          
          <v-card-subtitle class="mr-10">
            This chore is currently assigned to:
            <v-card-text>{{ this.chore.assignee }}</v-card-text>
          </v-card-subtitle>

        </v-container>

        <v-container v-else >
          <v-avatar size="150" class="mr-10">
             <Avatar
            :username="this.unknown"
            :size="80"
          />
          </v-avatar>

          <v-card-text>This chore is currently unassigned</v-card-text>
        </v-container>
     

      <v-card-actions class="d-flex justify-space-around">

        <v-btn
          v-if="this.chore.assignee != 'Everyone'"
          @click="openAssignModal"
          text
          color="orange darken-4"
        >
          Reassign
        </v-btn>

        <v-btn
          v-else
          @click="openAssignModal"
          text
          color="orange darken-3"
        >
          Assign
        </v-btn>

        <v-btn text color="orange darken-3" @click="openDeleteModal">
          Delete
        </v-btn>

        <v-btn text color="orange darken-3" @click="closeModalEmitter">
          Close
        </v-btn>

      </v-card-actions>

    </v-card>
    <DeleteChoreCheck
      @deleteChorePlease="passChoreAndCloseDelete"
      @closeDeleteModalPlease="modals.deleteModalCheck = false"
      v-if="modals.deleteModalCheck"
      :choreID="this.choreID"
    />
    <AssignChore 
    v-if="modals.assignModalCheck"
    @closeAssignModalPlease="modals.assignModalCheck = false"
    @assignChorePlease="assignChoreAndCloseAssign"
    :chore="this.chore"
    />
  </v-dialog>

</template>

<script>
import DeleteChoreCheck from "../views/Modals/DeleteChoreCheck";
import AssignChore from "../views/Modals/AssignChore.vue"
import Avatar from "vue-avatar";


export default {
  name: "ChoreInfo",
  props: ["chore"],
  components: {
    DeleteChoreCheck,
    AssignChore,
    Avatar,
  },
  data() {
    return {
      choreID: this.chore.id,
      assigneeURL: "",
      unknown: "???",
      modals: {
        deleteModalCheck: false,
        assignModalCheck: false,
      },
    };
  },
  methods: {
    openDeleteModal() {
      this.modals.deleteModalCheck = true;
    },

    openAssignModal() {
      this.modals.assignModalCheck = true;
    },

    closeModalEmitter() {
      this.$emit("closeModalPlease");
    },

    passChoreAndCloseDelete(choreID) {
      this.$emit("deleteChorePlease", choreID);
      this.modals.deleteModalCheck = false;
    },

    assignChoreAndCloseAssign(assignee) {
      const choreInfo = {
        newAssignee: assignee.username,
        id: this.choreID,
        assigneeURL: assignee.photo_url
      }
      this.$emit("assignChorePlease", choreInfo);
      this.modals.assignModalCheck = false;
    },
  },
};
</script>
