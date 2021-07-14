<template>
  <v-dialog persistent :value="true">
    <v-card class="orange lighten-5">
      <v-card-title class=" orange headline text-center">
        How can I find my house key?
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pa-2 text-center font-weight-bold">
        Finding your house key is easy! Once a user has created a house, ask
        them to:
      </v-card-text>
      <v-divider></v-divider>
      <v-list class="orange lighten-5">
        <v-list-item class="py-2 text-subtitle-2">
         ⚫  Navigate to their profile by clicking on this icon: <v-icon color="brown lighten-1">
            mdi-account-circle-outline
          </v-icon>
        </v-list-item>
        <v-list-item class="py-2 text-subtitle-2">
          ⚫ Use the "Copy House Key" button to copy your house key OR copy the house key manually
        </v-list-item>
        <v-list-item class="py-2 text-subtitle-2">
          ⚫ Text you your housekey and paste it in the "Enter Your House Key" field below!<!--  -->
        </v-list-item>
      </v-list>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="orange darken-3" text @click="$emit('closeModal')">
          OK, got it!
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "HouseKeyTutorial",
  data() {
    return {};
  },
};
</script>

<style scoped>
.v-list-item {
  min-height: 24px
}
</style>

⚫ 