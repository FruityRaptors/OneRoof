 
<template>

  <v-dialog persistent max-width="290" :value="true">
    <v-card class="orange lighten-5">
      <v-card-title class="headline"> Delete Chore </v-card-title>
      <v-card-text
        >Are you sure you would like to delete this chore?</v-card-text
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="orange darken-3" text @click="$emit('closeDeleteModalPlease')">
          CANCEL
        </v-btn>
        <v-btn @click="deleteChoreEmitter" color="orange darken-3" text>
          DELETE
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>


<script>
export default {
  name: "DeleteChoreCheck",
  props: ["choreID"],
  methods: {
    deleteChoreEmitter() {
      this.$emit("deleteChorePlease", this.choreID);
    },
  },
};
</script>
