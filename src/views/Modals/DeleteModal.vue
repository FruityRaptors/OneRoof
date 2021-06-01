 <template>
 <v-dialog
      max-width="290"
      :value = "true"
    >   
      <v-card>
        <v-card-title class="headline">
          Delete Todo
        </v-card-title>
        <v-card-text>You sure you wanna do that you Dingus?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green lighten-0"
            text
            @click="$emit('closeModal')"
          >
            Cancel
          </v-btn>
          <v-btn
             @click="onClickDeleteButton"
            color="green lighten-0"
            text
          >
            DELETE
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
       
      }
    },
    methods: {
        onClickDeleteButton() {
            this.$emit('closeModal');
            this.$emit('clicked');
        }
    }
};
 </script>
 <!-- $store.dispatch('deleteTodo', todo.id) -->
 <!-- @click="$emit('closeModal'); -->