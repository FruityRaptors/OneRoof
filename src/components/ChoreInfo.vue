 <template>
  <v-dialog max-width="290" :value="true">
    <v-card class="mx-auto brown lighten-5" max-width="344">
      <v-card-text>
        <div>Word of the Day</div>
        <p class="display-1 text--primary">{{this.chore.chore}}</p>
        <p>{{this.chore.asignee}}</p>
        <div class="text--primary">
         {{this.chore.description}}
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="deep-purple accent-4"> Edit chore </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ChoreInfo",
  props: ["chore"],
  data() {
    return {};
  },
};
</script>
