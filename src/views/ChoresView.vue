<template>
  <div class="chore-page orange lighten-5" id="chore-page-container">
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
            <v-list-item-subtitle v-if="chore.assignee">
              {{ chore.assignee }}
            </v-list-item-subtitle>
            <v-list-item-subtitle v-else>
              this chore is currently unassigned
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon
              icon
              @click.stop="showChoreInfo(chore)"
              color="orange accent-3"
              >mdi-clipboard-edit</v-icon
            >
          </v-list-item-action>
        </v-list-item>

        <!-- Border Between Todos -->
        <v-divider :key="chore.id"></v-divider>
      </div>
      <ChoreInfo
        persistent
        v-if="modals.ChoreInfo"
        @closeModalPlease="modals.ChoreInfo = false"
        @deleteChorePlease="deleteChore"
        @assignChorePlease="assignChoreAndGetChores"
        :chore="this.clickedChore"
      />
      <AddChore @addThisChorePlease="setChore" />
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
      choreToAdd: {},
      modals: {
        ChoreInfo: false,
      },
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
      this.chores = this.$store.state.chores;
    },

    async addChoreAndGetChore() {
      // here we find our two API calls
      let newChore = {
        chore: this.choreToAdd.chore,
        description: this.choreToAdd.description,
        assignee: this.choreToAdd.assignee,
        creatorid: this.currentUser.id,
        house_key: this.currentUser.house_keys[0],
      };
      await this.$store.dispatch("addNewChore", newChore);
      await this.$store.dispatch("getChores", newChore.house_key);
    },

    showChoreInfo(chore) {
      this.clickedChore = chore;
      this.modals.ChoreInfo = true;
    },

    async deleteChore(choreID) {
      this.$store.state.chores = this.$store.state.chores.filter(
        (chore) => chore.id !== choreID
      );
      this.chores = this.$store.state.chores;

      await this.$store.dispatch("deleteChore", choreID);
      this.chores = this.$store.state.chores;
      this.modals.ChoreInfo = false;
    },

    async assignChoreAndGetChores(choreInfo) {
      this.modals.ChoreInfo = false;
      await this.$store.dispatch("updateChore", choreInfo);
      await this.$store.dispatch("getChores", this.currentUser.house_keys[0]);
      this.updateChores()
    },

  },
};
</script>

<style scoped>
</style>