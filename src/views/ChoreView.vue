<template>
  <div
    class="chore-page orange lighten-5"
    id="chore-page-container"
  >
    <!-- chore list platform -->
    <v-list class="pa-0 orange lighten-5" two-line flat>
      <!-- Each Chore in Chore list -->
      <div
        id="chore-container"
        class="orange lighten-4"
        v-for="chore in chores"
        :key="chore.id"
      >
        <v-list-item>
          <!-- Chore list text -->
          <v-list-item-content>
            <v-list-item-title>
              {{ chore.chore }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ chore.victimid }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <!-- Todo list text ends -->
        </v-list-item>
        <!-- Border Between Todos -->
        <v-divider :key="chore.id"></v-divider>
      </div>
      <AddChore @addThisChorePlease="pushChore" />
      <button @click="resetChores">reset chores (dev)</button>
      <!-- Each Todo in Todo list ends-->
    </v-list>
    <!-- todo list platform ends-->
  </div>
</template>

<script>
import AddChore from "../components/AddChore.vue";

export default {
  name: "Home",
  components: {
    AddChore,
  },
  data() {
    return {
      rerenderkey: 0,
      newChoreName: "",
      chores: [],
      modals: {
        deleteChore: false,
      },
      currentId: "",
      selectedVictim: "",
      users: this.$store.state.usersInSameHouse,
    };
  },
  mounted() {
    console.log("mounting");
    this.chores = this.$store.state.chores;
  },
  methods: {
    pushChore(chore) {
      console.log("Pushing chore:", chore);
      this.$store.commit("addChore", chore);
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
.no-chore-bg {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.5;
}

#icon-todo {
  transform: translateX(12%);
}
</style>