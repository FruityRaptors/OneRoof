<template>
<div>

<!-- Main card starts -->
 <v-card class="mx-auto text-center mt-10" max-width="400px" rounded>

     <v-card-title class="text-center">Looks like you don't have a home yet...</v-card-title>

         <v-card-text class="font-weight-bold">Enter House key</v-card-text>
   
<!-- Join a home field starts -->
         <v-text-field
            label="House Key..."
            class="ml-5 mr-5"
            filled
            dense
            rounded
            v-model="roomkey"
        ></v-text-field>  

    <v-btn
      rounded
      color="brown"
      dark
      class="mb-5"
      @click="joinHouse"
      >
      Join
    </v-btn>
<!-- Join a home field ends -->

     <v-card-subtitle class="font-weight-bold">or..</v-card-subtitle>

<!-- Name your home field starts-->
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
      color="brown"
      dark
      class="mb-5"
      @click="createHouse"
      >
      Make a Home
    </v-btn>
<!-- Name your home field ends -->
    


 </v-card>
<!-- Main card ends -->

 </div>
</template>

<script>
export default {

    name: "joinHouse",

data(){
    return {
     roomkey: undefined,
     homename: undefined
    }
}, // Data End

methods: {

    createHouse(){
        this.$store.dispatch("createHouse", {email: this.$store.state.user.email, homename: this.homename})
    },

    joinHouse(){
        this.$store.dispatch("joinHouse", {email: this.$store.state.user.email, roomkey: this.roomkey})
    }
} // Method End

} //Export end
</script>