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
<!-- Name your home field ends -->
    

     <v-btn
      rounded
      color="brown"
      dark
      class="mb-5"
      @click="joinHouse"
      >
      Make a Home
    </v-btn>

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
},
methods: {
    joinHouse(){
        this.$store.dispatch("createChatRoom", {email: this.$store.state.user.email, roomkey: this.homename})
    }
}

}
</script>