<template>
<div>

  <v-menu bottom left >
    <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on" >
            <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
    </template>
   <!-- <v-list v-if="modals.assignTodo">
        <v-list-item 
          v-for="user in users"
          :key="user.id"
          :value="user"
        >
          <v-list-item-title @change="onChange($event)">
          {{ user.username }}
          </v-list-item-title>
        </v-list-item>
    </v-list>  -->
    
     <v-list >
        <v-list-item v-for="(feature, idx) in features" :key="idx" @click="onClick(idx)">
            <v-list-item-icon>
                <v-icon v-text="feature.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ feature.name }}</v-list-item-title>
        </v-list-item>
    <!-- <AssignMenu class="TodoMenu2" /> -->


    </v-list>
   </v-menu>
   <AssignMenu v-if="modals.assignTodo" :todo="todo" @closeModal="modals.assignTodo = false" @console="consolelogger"       />
   <DeleteModal v-if="modals.deleteTodo" :todo="todo" @closeModal="modals.deleteTodo = false" @console="consolelogger" />
   <EditModal v-if="modals.editTodo" :todo="todo" @closeModal="modals.editTodo = false" @console="consolelogger" />

</div>
</template>

<script>
import DeleteModal from '../views/Modals/DeleteModal.vue'
import EditModal from '../views/Modals/EditModal.vue'
import AssignMenu from '../components/AssignMenu.vue'


export default {
    props: ['todo'],
    components: {
        DeleteModal, 
        EditModal,
        AssignMenu,
    },
    data() {
        return {
        modals: {
            editTodo: false,
            deleteTodo: false,
            assignTodo: false,
        },
        users: this.$store.state.usersInSameHouse, 
        features: [
          { name: 'Assign', icon:'mdi-account-plus', click() { 
              console.log("Assign")
              this.$emit('optionClicked')
              this.modals.assignTodo = true
              } 
        },
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
        closeOnContentClick: false, 
     };
    },
    methods: {
        onClick(idx) {
            this.features[idx].click.call(this)
        },
        consolelogger(){
            console.log("consolelogger", this.$store.state.currentTodoMessage)
        },
    }
  }
</script>

<style>
    .TodoMenu2 {
        color: brown;
        padding: 20;
        transform: translateX(40px);
    }
</style>