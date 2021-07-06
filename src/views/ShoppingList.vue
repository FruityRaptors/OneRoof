<template>
  <div class="todo-page orange lighten-5" id="shoppinglist-page-container">
    <v-text-field
      v-model="newItem"
      @click:append.prevent="addShoppingListItem"
      @keyup.enter.prevent="addShoppingListItem"
      class="pa-2 orange lighten-5"
      outlined
      label="Add an item"
      append-icon="mdi-pencil-plus-outline"
      clearable
      hide-details
    >
    </v-text-field>
    <v-list
      v-if="checkShoppingList.length"
      class="pa-0 orange lighten-5"
      two-line
      flat
    >
      <!-- Each Todo in Todo list -->
      <div
        id="item-container"
        class="orange lighten-4"
        v-for="item in checkShoppingList"
        :key="item.id"
      >
        <v-list-item
          @click="putItemInCart(item.id)"
          :class="{ 'light-green accent-1': item.inCart }"
        >
        
          <!-- Todo tick box     -->
          <v-list-item-action>
            <v-checkbox
              :input-value="item.inCart"
              color="light-green darken-4"
            >
            </v-checkbox>
          </v-list-item-action>
          <!-- Todo tick box ends -->

          <!-- Todo list text -->
          <v-list-item-content>
            <v-list-item-title
              :class="{ 'text-decoration-line-through': item.inCart }"
            >
              {{ item.item }}
            </v-list-item-title>

          </v-list-item-content>
          <!-- Todo list text ends -->

          <!-- Todo Menu Ends -->
        </v-list-item>
        <!-- Border Between Todos -->
        <v-divider :key="item.id"></v-divider>
      </div>
      <!-- Each Todo in Todo list ends-->
    </v-list>
  </div>
</template>

<script>
import { DateTime } from "luxon";

export default {
  name: "ShoppingList",
  data() {
    return {
      newItem: "",
    };
  },

  methods: {
    async addShoppingListItem() {
      if (this.newItem.length <= 0) {
        return;
      }

      let newItem = {
        item: this.newItem,
        date: DateTime.now().toISO(),
        creatorid: this.$store.state.user.username,
        house_key: this.$store.state.user.house_keys[0],
      };

      await this.$store.dispatch("addNewShoppingListItem", newItem);
      await this.$store.dispatch(
        "getShoppingList",
        this.$store.state.user.house_keys[0]
      );

      this.newItem = ""
    },

    putItemInCart(id) {
      let item = this.checkShoppingList.filter((item) => item.id === id)[0];
      item.inCart = !item.inCart;
    },
  },

  computed: {
    checkShoppingList: function () {
      let shoppingList = this.$store.state.shoppingList;
      /* for (let item of shoppingList) {
        let timestamp = item.date;
        let timeFromThen = DateTime.fromISO(timestamp).toRelative({ days: 1 });
        item.date = timeFromThen;
      } */
      return shoppingList;
    },
  },
};
</script>

<style scoped>
.redtext {
  color: red !important;
}
</style>
