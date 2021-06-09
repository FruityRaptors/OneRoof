 <template>
  <v-dialog max-width="344" :value="true">
    <v-card class="mx-auto brown lighten-5" max-width="344">
      <v-card-text>
        <p class="display-1 text--primary">{{ this.chore.chore }}</p>
        <div class="text--primary">
          {{ this.chore.description }}
        </div>
        <div v-if="this.chore.assignee">
          <Avatar
            :src="this.$store.state.user.photo_url"
            :username="this.chore.assignee"
            :size="80"
          />
          <p>
            This chore is currently assigned to:
            <strong>{{ this.chore.assignee }}</strong>
          </p>
        </div>
        <div v-else>
          <Avatar :username="this.unknown" />
          <p>This chore is currently <strong>unassigned!</strong></p>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          v-if="this.chore.assignee"
          @click="openAssignModal"
          text
          color="deep-purple accent-4"
        >
          Reassign
        </v-btn>
        <v-btn
          v-else
          @click="openAssignModal"
          text
          color="deep-purple accent-4"
        >
          Assign
        </v-btn>
        <v-btn text color="deep-purple accent-4" @click="openDeleteModal">
          Delete
        </v-btn>
        <v-btn text color="deep-purple accent-4" @click="closeModalEmitter">
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
      this.$emit("closeInfoModalPlease");
    },

    passChoreAndCloseDelete(choreID) {
      this.$emit("deleteChorePlease", choreID);
      this.modals.deleteModalCheck = false;
    },

    assignChoreAndCloseAssign(assignee) {
      const choreInfo = {
        newAssignee: assignee,
        id: this.choreID
      }
      this.$emit("assignChorePlease", choreInfo);
      this.modals.assignModalCheck = false;
    },
  },
};
</script>
