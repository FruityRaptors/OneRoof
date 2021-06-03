<template>
  <v-menu bottom left>
    <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on" >
            <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
    </template>
    <v-list>
        <v-list-item v-for="(feature, idx) in features" :key="idx" @click="onClick(idx)">
            <v-list-item-icon>
                <v-icon v-text="feature.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ feature.name }}</v-list-item-title>
        </v-list-item>
    </v-list>
   </v-menu>
</template>

<script>
export default {
    data: () => ({
      features: [
        { name: 'Assign', icon:'mdi-account-plus', click() { console.log("Assign")} },
        { name: 'Edit', icon:'mdi-square-edit-outline', click() { console.log("Edit")} },
        { name: 'Delete', icon:'mdi-delete', click() { console.log("Delete")} },
      ],
    }),
    methods: {
        onClick(idx) {
            this.features[idx].click()
        }
    }
  }
</script>

<style>

</style>