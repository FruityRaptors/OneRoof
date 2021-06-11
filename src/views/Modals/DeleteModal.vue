<template>
 <v-dialog persistent max-width="75%" :value = "true" >   
      <v-card class="orange lighten-5">
        <v-card-title class="headline">
          Delete Todo
        </v-card-title> 

        <v-card-text>
          Would you like to delete this todo? <br>
          Deleting is <i>permanent</i>.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="orange darken-3" text @click="$emit('closeModal')">
            CANCEL
          </v-btn>

          <v-btn @click="onClickDeleteButton" color="orange darken-3" text>
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