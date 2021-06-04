 <template>
  <v-dialog max-width="290" :value="true">
    <v-card class="mx-auto brown lighten-5" max-width="344">
      <v-card-text>
        <p class="display-1 text--primary">{{this.chore.chore}}</p>
        <p>{{this.chore.asignee}}</p>
        <div class="text--primary">
         {{this.chore.description}}
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="deep-purple accent-4" @click="deleteChoreEmitter"> Delete </v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn text color="deep-purple accent-4" @click="closeModalEmitter"> Close </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ChoreInfo",
  props: ["chore"],
  data() {
    return {};
  },
  methods: {
    closeModalEmitter() {
      this.$emit("closeModalPlease")
    },

    deleteChoreEmitter(){
      this.$emit("deleteChorePlease", this.chore.chore)
    }
  }
};
</script>
