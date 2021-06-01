<template>
<v-card class="mx-auto mt-5" max-width="300">
    <v-card-title class="text-center d-flex justify-center">
        Invite a family member
    </v-card-title>
    <v-card-text>
        Copy and send the code below to the person(s) you'd like to invite
    </v-card-text>
    <v-text-field
            :value="roomkey"
            label="House Code"
            readonly
    ></v-text-field>
</v-card>
    
</template>

<script>
export default {
    name: "Invite",
    data(){
        return {
            roomkey: "supposed to be a really long room key" //Need to be replaced with house_key from user
        }
    }
}
</script>