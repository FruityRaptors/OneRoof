<template>
<v-container>
    <v-list-item v-for="user in users" :key="user">
        <v-list-item-title>{{user.username}}</v-list-item-title>
    </v-list-item>
</v-container>
</template>

<script>
export default {
    name: 'DM',
    data(){
        return {
            users: this.$store.state.usersInSameHouse
        }
    }
    
}
</script>


<style >
    
</style>