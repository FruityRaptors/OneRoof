<template>
 <v-dialog persistent max-width="75%" :value="true">   
      <v-card class="orange lighten-5">

        <v-card-title class="headline">
          Edit Todo
        </v-card-title>

        <v-card-text>
          Please edit your todo
          <v-text-field v-model="todo"/>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="orange darken-3" text @click="$emit('closeModal')">
            CANCEL
          </v-btn>

          <v-btn @click="onClickEditButton" color="orange darken-3" text>
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
            this.$store.commit('setCurrentTodoMessage',this.todo)
            this.$emit('closeModal');
            this.$parent.$emit('editFromModal');
        }
    },
    mounted() {
      this.todo = this.$store.state.currentTodo.todo
    }
};
</script>