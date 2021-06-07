<template>
<v-container>

<!-- Name list view -->

<v-card v-if="dming === false">
    <v-card v-for="user in users" :key="user.id" class="d-flex orange lighten-4" elevation="0" @click="checkDmTarget(user)">
         <v-avatar size="30" class="ml-3 mt-5">
             <Avatar :src="user.photo_url" :username="user.username" :size="30"></Avatar>
         </v-avatar>
         <v-card-title>
         {{user.username}}
         </v-card-title>
    </v-card>
</v-card>

<!-- Name list view -->


<!-- Chat View -->

    <SingleChat v-else :roomkey="roomkey" :user="dmingUser" @back="dming = false"/>

<!-- Chat View -->

</v-container>
</template>

<script>
import Avatar from "vue-avatar"
import SingleChat from "../components/SingleChat.vue"

export default {
    name: 'DM',
    components: {
        Avatar,
        SingleChat
    },
    data(){
        return {
            users: '',
            dming: false,
            roomkey: '',
            dmingUser: '',
        }
    },
    mounted(){
        this.users = this.filterUserList(this.$store.state.usersInSameHouse)
    },
    methods: {

        filterUserList(userList){
            return userList.filter((user) => user.username !== this.$store.state.user.username)
        },

        async checkDmTarget(user){
            let users = {
                username_1: user.id,
                username_2: this.$store.state.user.id
            }

            let roomkey = await this.$store.dispatch("checkDmTarget", users)

            this.dmingUser = user.username
            this.roomkey = roomkey
            this.dming = true
        },
        
    },
}
</script>


<style >
    
</style>