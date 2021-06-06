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
   <EditModal v-if="modals.editTodo" :todo="todo" @closeModal="modals.editTodo = false" @console="consolelogger" />
</div>
</template>

<script>
import DeleteModal from '../views/Modals/DeleteModal.vue'
import EditModal from '../views/Modals/EditModal.vue'

export default {
    props: ['todo'],
    components: {
        DeleteModal, 
        EditModal,
    },
    data: () => ({
        modals: {
            editTodo: false,
            deleteTodo: false,
        },
        users: this.$store.state.usersInSameHouse,
        features: [
          { name: 'Assign', icon:'mdi-account-plus', click() { console.log("Assign")} },
          { name: 'Edit', icon:'mdi-square-edit-outline', click() { 
            console.log("Edit Clicked")
            this.$emit('optionClicked')
            this.modals.editTodo = true
            } 
        },
        { name: 'Delete', icon:'mdi-delete', click(){ 
            this.$emit('optionClicked')
            this.modals.deleteTodo = true
            } 
        },
      ],
    }),
    methods: {
        onClick(idx) {
            this.features[idx].click.call(this)
        },
        consolelogger(){
            console.log("consolelogger", this.$store.state.currentTodoMessage)
        }
    }
  }
</script>

<style>

</style>