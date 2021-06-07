<template>
<v-card>
HELLO
    <v-list v-for="user in users" :key="user.id">
        <v-list-item-title>{{user.username}}</v-list-item-title>
    </v-list>
</v-card>
</template>

<script>
export default {
    name: 'DM',
    data(){
        return {
            users: '',
        }
    },
    mounted(){
        this.users = this.$store.state.usersInSameHouse
    }
    
}
</script>


<style >
    
</style>