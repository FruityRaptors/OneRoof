<template>
  <div>
    <!-- Each Chore in Chore list -->
    <v-list
      class="orange lighten-4 pb-0"
      v-for="chore in chores"
      :key="chore.id"
    >
      <v-list-item>
        <v-avatar size="50">
            <Avatar
              v-if="chore.assigneeURL === 'null'"
              :username="chore.assignee"
              :size="50"
            ></Avatar>
             <v-img v-else :src="chore.assigneeURL"></v-img>
          </v-avatar>
        <!-- Chore list text -->
        <v-list-item-content class="pl-4">
          

          <v-list-item-title>
            {{ chore.chore }}
          </v-list-item-title>
 
          <v-list-item-subtitle v-if="chore.assignee">
            {{ chore.assignee }}
          </v-list-item-subtitle>

          <v-list-item-subtitle v-else>
            this chore is currently unassigned
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon
            class="pr-2"
            icon
            @click.stop="showChoreInfo(chore)"
            color="orange accent-3"
            >mdi-clipboard-edit</v-icon
          >
        </v-list-item-action>
        <v-list-item-action>
          <v-icon
            icon
            @click.stop="showAddTodoModal(chore)"
            color="orange accent-3"
            >mdi-format-list-checks</v-icon
          >
        </v-list-item-action>
      </v-list-item>

      <!-- Border Between Todos -->
      <v-divider></v-divider>
    </v-list>

    <AddChore @addThisChorePlease="setChore" />

    <TodoFromChoreCheck
      @closeTodoModalPlease="addTodo = false"
      @makeATodoPlease="addTodoFromChore"
      v-if="addTodo"
      :chore="this.clickedChore"
    />

    <ChoreInfo
      persistent
      v-if="modals"
      @closeModalPlease="modalToggle"
      @deleteChorePlease="deleteChore"
      @assignChorePlease="assignChoreAndGetChores"
      :chore="this.clickedChore"
    />
    <!-- todo list platform ends-->
  </div>
</template>

<script>
import AddChore from "../components/AddChore.vue";
import ChoreInfo from "../components/ChoreInfo.vue";
import TodoFromChoreCheck from "./Modals/TodoFromChoreCheck.vue";
import { DateTime } from "luxon";
import Avatar from "vue-avatar";

export default {
  name: "Home",
  components: {
    AddChore,
    ChoreInfo,
    TodoFromChoreCheck,
    Avatar,
  },
  data() {
    return {
      currentUser: {},
      clickedChore: {},
      choreToAdd: {},
      modals: false,
      addTodo: false,
      users: this.$store.state.usersInSameHouse,
    };
  },
  mounted() {
    this.currentUser = this.$store.state.user;
    this.updateChores();
  },
  methods: {
    setChore(chore) {
      this.choreToAdd = chore;
      this.updateChores();
    },

    async updateChores() {
      if (this.choreToAdd.chore) {
        await this.addChoreAndGetChore();
      }
    },

    async addChoreAndGetChore() {
      // here we find our two API calls
      let newChore = {
        chore: this.choreToAdd.chore,
        description: this.choreToAdd.description,
        assignee: this.choreToAdd.assignee,
        creatorid: this.currentUser.id,
        house_key: this.currentUser.house_keys[0],
        assigneeURL:this.choreToAdd.assigneeURL
      };

      await this.$store.dispatch("addNewChore", newChore);
      await this.$store.dispatch("getChores", newChore.house_key);
    },

    showChoreInfo(chore) {
      this.clickedChore = chore;
      this.modals = !this.modals;
    },

    showAddTodoModal(chore) {
      this.clickedChore = chore;
      this.addTodo = !this.addTodo;
    },

    modalToggle() {
      this.modals = !this.modals;
    },

    async deleteChore(choreID) {
      this.$store.state.chores = this.$store.state.chores.filter(
        (chore) => chore.id !== choreID
      );
      await this.$store.dispatch("deleteChore", choreID);
      this.modals = false;
    },
    // let's wrap this in a async wrapper
    async assignChoreAndGetChores(choreInfo) {
      this.modals = false;
      await this.$store.dispatch("updateChore", choreInfo);
      await this.$store.dispatch("getChores", this.currentUser.house_keys[0]);
    },

    async addTodoFromChore(chore) {
      this.addTodo = false;

      let victim = "Everyone";

      if (chore.assignee) {
        victim = chore.assignee;
      }
      let newTodo = {
        todo: chore.chore,
        date: DateTime.now().toISO(),
        victimid: victim,
        creatorid: chore.id,
        complete: false,
        house_key: chore.house_key,
        assigneeURL: "",
      };

      await this.$store.dispatch("addTodo", newTodo);
      await this.$store.dispatch(
        "getTodos",
        this.$store.state.user.house_keys[0]
      );
    },
  },
  computed: {
    chores: function () {
      return this.$store.state.chores;
    },
  },
};
</script>

<style scoped>
</style>