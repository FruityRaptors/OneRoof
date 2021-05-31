 <template>
 <v-dialog
      persistent
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
            @click="dialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            @click="$store.dispatch('deleteTodo', todo.id)"
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
    props: ['todo']
};
 </script>
 