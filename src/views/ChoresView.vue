<template>
  <div class="chore-page orange lighten-5" id="chore-page-container">
    <!-- chore list platform -->
    <v-list class="pa-0 orange lighten-5" two-line flat>
      <!-- Each Chore in Chore list -->
      <div
        id="chore-container"
        class="orange lighten-4"
        v-for="chore in chores"
        :key="chore.chore"
      >
        <!-- THIS KEY NEEDS TO BE UPDATED! -->
        <v-list-item>
          <!-- Chore list text -->
          <v-list-item-content>
            <v-list-item-title>
              {{ chore.chore }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ chore.victimid }}
            </v-list-item-subtitle>
            <v-list-item-action class="">
              <v-icon
                icon
                @click.stop="showChoreInfo(chore)"
                color="orange accent-3"
                >mdi-clipboard-edit</v-icon
              >
            </v-list-item-action>
          </v-list-item-content>
        </v-list-item>
        <!-- Border Between Todos -->
        <v-divider :key="chore.id"></v-divider>
      </div>
      <ChoreInfo
        v-if="modals.ChoreInfo"
        @closeModalPlease="modals.ChoreInfo = false"
        @deleteChorePlease="deleteChore"
        :chore="this.clickedChore"
      />
      <AddChore @addThisChorePlease="pushChore" />
    </v-list>
    <!-- todo list platform ends-->
  </div>
</template>

<script>
import AddChore from "../components/AddChore.vue";
import ChoreInfo from "../components/ChoreInfo.vue";

export default {
  name: "Home",
  components: {
    AddChore,
    ChoreInfo,
  },
  data() {
    return {
      currentUser: {},
      chores: [],
      clickedChore: {},
      modals: {
        ChoreInfo: false,
      },
      users: this.$store.state.usersInSameHouse,
    };
  },
  mounted() {
    console.log("mounting");
    this.currentUser = this.$store.state.user;
    this.$store.commit("resetChorelist");
    let seedChore1 = {
      chore: "Mow the Lawn",
      description: "watch out for Potato's pooptatoes!",
      asignee: "Pete",
    };
    let seedChore2 = {
      chore: "Do dishes",
      description: "Do the dishes after dinner every day",
      asignee: "Jeff!",
    };
    this.$store.state.chores.push(seedChore1);
    this.$store.state.chores.push(seedChore2);

    this.chores = this.$store.state.chores;
  },
  methods: {
    pushChore(chore) {
      console.log("Pushing chore:", chore);
      this.$store.commit("addChore", chore);
    },

    showChoreInfo(chore) {
      this.clickedChore = chore;
      this.modals.ChoreInfo = true;
    },

    deleteChore(chorename) {
      console.log("deleting:", chorename);
      // the following lines are super ghetto, I know.
      let newChores = [];
      for (let chore of this.chores) {
        if (chore.chore !== chorename) {
          newChores.push(chore);
        }
      }
      this.chores = newChores;
      // sorry about that, fellas
      this.modals.ChoreInfo = false;
    },

    //for dev purposes only
    resetChores() {
      this.$store.commit("resetChorelist");
    },

    //end dev methods
  },
};
</script>

<style scoped>
</style>