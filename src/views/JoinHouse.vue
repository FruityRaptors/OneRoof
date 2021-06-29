<template>
<!-- Main card starts -->
 <v-card class="mx-auto text-center mt-10 orange lighten-5" max-width="95%" rounded elevation="5">

     <v-card-subtitle class="text-center text-justify font-weight-bold text--primary">Looks like you don't have a home yet...</v-card-subtitle>

         <v-card-text class="font-weight-bold">Enter House key</v-card-text>
   
<!-- Join a home field starts -->
         <v-text-field
            label="House Key..."
            class="ml-5 mr-5"
            :rules="[rules.min]"
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
      color="orange lighten-2"
      dark
      class="mb-5"
      @click="createHouse"
      >
      Make a Home
    </v-btn>
<!-- Name your home field ends -->
    


 </v-card>
<!-- Main card ends -->
</template>

<script>
export default {

    name: "JoinHouse",

data(){
    return {
     roomkey: undefined,
     homename: undefined,
     rules: {
         min: v => v.length === 32 || 'House keys contains 32 characters'
     }
    }
}, // Data End

methods: {

    createHouse(){
        this.$store.dispatch("createHouse", {email: this.$store.state.user.email, homename: this.homename})
    },

    joinHouse(){
        if(this.roomkey === 32){
            this.$store.dispatch("joinHouse", {email: this.$store.state.user.email, roomkey: this.roomkey})
        } 
    }
} // Method End

} //Export end
</script>