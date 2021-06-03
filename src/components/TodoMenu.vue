<template>
<div>
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
   <DeleteModal v-if="modals.deleteTodo" :todo="todo" @closeModal="modals.deleteTodo = false" @console="consolelogger" />
</div>
</template>

<script>
import DeleteModal from '../views/Modals/DeleteModal.vue'

export default {
    props: ['todo'],
    components: {
        DeleteModal, 
    },
    data: () => ({
        modals: {
            deleteTodo: false,
        },
      features: [
        { name: 'Assign', icon:'mdi-account-plus', click() { console.log("Assign")} },
        { name: 'Edit', icon:'mdi-square-edit-outline', click() { console.log("Edit")} },
        { name: 'Delete', icon:'mdi-delete', click(){ 
            this.$emit('deleteClicked')
            this.modals.deleteTodo = true
            } 
        },
      ],
    }),
    methods: {
        onClick(idx) {
            this.features[idx].click.call(this)
        },
        consolelogger(todo){
            console.log(todo)
        }
    }
  }
</script>

<style>

</style>