 <template>
 <v-dialog persistent max-width="95%" :value = "true" >   
      <v-card class="brown lighten-4">
        <v-card-title class="headline">
          Delete Todo
        </v-card-title> 

        <v-card-text>
          Would you like to delete this todo? <br>
          Deleting is <i>permanent</i>.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="brown lighten-1" text @click="$emit('closeModal')">
            CANCEL
          </v-btn>

          <v-btn @click="onClickDeleteButton" color="brown lighten-0" text>
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
            this.$parent.$emit('deleteFromModal');
        }
    }
};
 </script>