 <template>
  <v-dialog max-width="290" :value="true">
    <v-card class="mx-auto brown lighten-5" max-width="344">
      <v-card-text>
        <p class="display-1 text--primary">{{ this.chore.chore }}</p>
        <p>{{ this.chore.asignee }}</p>
        <div class="text--primary">
          {{ this.chore.description }}
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn
          text
          color="deep-purple accent-4"
          @click="modals.deleteCheck = true"
        >
          Delete
        </v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn text color="deep-purple accent-4" @click="closeModalEmitter">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
    <DeleteChoreCheck
      @deleteChorePlease="passAndClose"
      @closeModalPlease="modals.deleteCheck = false"
      v-if="modals.deleteCheck"
      :chorename="this.chorename"
    />
  </v-dialog>
</template>

<script>
import DeleteChoreCheck from "../views/Modals/DeleteChoreCheck";
export default {
  name: "ChoreInfo",
  props: ["chore"],
  components: {
    DeleteChoreCheck,
  },
  data() {
    return {
      chorename: this.chore.chore,
      modals: {
        deleteCheck: false,
      },
    };
  },
  methods: {
    closeModalEmitter() {
      this.$emit("closeModalPlease");
    },

    passAndClose(chorename) {
      this.$emit("deleteChorePlease", chorename)
      this.deleteCheck = false;
    },
  },
};
</script>
