<template>
  <!-- Main card starts -->
  <v-card
    class="mx-auto text-center mt-10 orange lighten-5"
    max-width="95%"
    rounded
    elevation="5"
  >
    <v-card-subtitle
      class="text-center title mt-6 text-justify font-weight-bold text--primary"
      >Looks like you don't have a home yet.</v-card-subtitle
    >

    <v-divider></v-divider>

    <!-- Name your home field starts-->
    <v-card-subtitle class="font-weight-bold"
      >If you're the first user in your household to sign up for OneRoof, pick a
      name for your home!</v-card-subtitle
    >

    <v-text-field
      label="Name your Home"
      class="ml-5 mr-5"
      filled
      dense
      rounded
      v-model="homename"
    ></v-text-field>

    <v-btn
      rounded
      color="orange lighten-2"
      dark
      class="mb-5"
      @click="createHouse"
    >
      Make a Home
    </v-btn>
    <!-- Name your home field ends -->

    <!-- Join a home field starts -->
    <v-card-text class="font-weight-bold"
      >...or if someone else has already created a home for your household,
      please enter the house key:</v-card-text
    >
    <v-card-subtitle class="pointer text-right py-0 indigo--text" @click="tutorialPopup" >How do I find my house key?</v-card-subtitle>
    <HouseKeyTutorial v-if="modals.houseKeyTutorial" @closeModal="modals.houseKeyTutorial = false"/>
    <v-text-field
      label="House Key..."
      class="ml-5 mr-5"
      :rules="[formRules.minLength]"
      filled
      dense
      rounded
      v-model="roomkey"
    ></v-text-field>

    <v-btn
      rounded
      color="orange lighten-2"
      dark
      class="mb-5"
      @click="joinHouse"
    >
      Join
    </v-btn>
    <!-- Join a home field ends -->
  </v-card>
  <!-- Main card ends -->
</template>

<script>
import HouseKeyTutorial from "./Modals/HouseKeyTutorial.vue"

export default {
  name: "JoinHouse",

  data() {
    return {
      roomkey: undefined,
      homename: undefined,
      formRules: {
        minLength: (v) =>
          v.length === 32 ||
          "Your house key must be exactly 32 characters long",
      },
      modals: {
          houseKeyTutorial: false
      }
    };
  }, 
  
  components: {
      HouseKeyTutorial,
  },

  methods: {
    createHouse() {
      this.$store.dispatch("createHouse", {
        email: this.$store.state.user.email,
        homename: this.homename,
      });
    },

    joinHouse() {
      if (this.roomkey.length === 32) {
        this.$store.dispatch("joinHouse", {
          email: this.$store.state.user.email,
          roomkey: this.roomkey,
        });
      } else {
        window.alert("Wrong House Key Input");
      }
    },

    tutorialPopup() {
        this.modals.houseKeyTutorial = true
    }
  }, // Methods end
}; //Export ends
</script>

<style scoped>
.pointer {
    cursor: pointer
}
</style>
