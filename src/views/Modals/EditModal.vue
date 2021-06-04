 <template>
 <v-dialog
      max-width="290"
      :value = "true"
    >   
      <v-card class="brown lighten-5">
        <v-card-title class="headline">
          Edit Todo
        </v-card-title>
        <v-card-text>Please edit your todo
          <v-text-field v-model="todo"/>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green lighten-0"
            text
            @click="$emit('closeModal')"
          >
            CANCEL
          </v-btn>
          <v-btn
             @click="onClickEditButton"
            color="green lighten-0"
            text
          >
            SAVE
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
 </template>

 <script>
 export default {
    name: 'Test',
    data(){
      return {
       todo: null
      }
    },
    methods: {
        onClickEditButton() {
            console.log(this.todo)
            this.$store.commit('setCurrentTodoMessage',this.todo)
            this.$emit('closeModal');
            this.$parent.$emit('editFromModal');
            this.$emit('console')
        }
    },
    mounted() {
      this.todo = this.$store.state.currentTodo.todo
    }
};
 </script>
 <!-- $store.dispatch('deleteTodo', todo.id) -->
 <!-- @click="$emit('closeModal'); -->