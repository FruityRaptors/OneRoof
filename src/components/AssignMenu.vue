<template>
<div>

  <v-dialog persistent max-width="290" :value = "true" >  
   <v-card class="brown lighten-5">

         <v-card-title class="headline">
          Assign Todo
        </v-card-title>
    
     <v-list class="brown lighten-5">
      <div id="name-container" class="brown lighten-5">
        <v-list-item v-for="user in users" :key="user.id" :value="user">
          <v-list-item-title @click="assignUser(user.username)">
            {{ user.username }}
          </v-list-item-title>
        </v-list-item>

      </div>
    </v-list>
   </v-card>
  </v-dialog>

</div>
</template>

<script>
export default {
  name: "AssignMenu",
      data() {
        return {
        users: this.$store.state.usersInSameHouse, 
        }
      },
    methods: {
        onChange() {
            console.log("HI");
        },
        assignUser(userName) {
            this.$parent.$emit('setAssignee', userName)
            this.$emit('closeModal')
        },
    }
  }
</script>

<style>
/* .icon {
  margin-left: 5px;
}
.the-text {
  margin-left: 25px;
  padding-top: 5px;
} */
</style>