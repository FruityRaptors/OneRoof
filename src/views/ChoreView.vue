<template>
  <div class="chore-page orange lighten-5" id="chore-page-container">
    <AddChore />
    <!-- chore list platform -->
    <v-list v-if="chores.length" class="pa-0 orange lighten-5" two-line flat>
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

          <!-- Delete Button -->
          <v-list-item-action class="">
            <v-icon color="orange accent-3"> mdi-delete</v-icon>

            <!-- Delete Button ends-->
            <!-- Assignee Dropdown Starts -->
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  class="pt-2 pr-1"
                  color="orange accent-3"
                  v-bind="attrs"
                  v-on="on"
                  >mdi-account-plus</v-icon
                >
              </template>
              <v-list>
                <v-list-item
                  v-for="user in users"
                  :key="user.id"
                  :value="chore"
                >
                  <v-list-item-title @click="setAssignee(user, chore)">
                    {{ user.username }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list-item-action>
          <!-- Assignee Dropdown Ends -->
        </v-list-item>
        <!-- Border Between Todos -->
        <v-divider :key="chore.id"></v-divider>
      </div>
      <!-- Each Todo in Todo list ends-->
    </v-list>
    <!-- todo list platform ends-->

    <!-- No Todos if todo list is empty -->
    <div v-else class="no-todo-bg">
      <v-icon size="100" color="green darken-2" id="icon-chore"
        >mdi-help-box</v-icon
      >
      <div class="text-h5">Add a Chore!</div>
    </div>
    <!-- Delete Modal -->
  </div>
</template>

<script>
// import TodoList from '../components/TodoList.vue'

export default {
  name: "Home",
  components: {},
  data() {
    return {
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
    // these lines add a seed chore; they can be deleted after we're live with this module
    let seedChore = {
      id: 1,
      chore: "Mow the lawn",
      frequency: "weekly",
    };
    this.$store.commit("resetChorelist")
    this.$store.commit("addChore", seedChore);
    // seed chores end
    this.chores = this.$store.state.chores;
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