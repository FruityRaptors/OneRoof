<template>
  <div
    class="shoppinglist-page orange lighten-5"
    id="shoppinglist-page-container"
  >
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
    <div class="text-center">
      <v-btn
        class="mt-5"
        color="orange lighten-1"
        dark
        @click="clearCheckedItems"
      >
        Clear checked items
      </v-btn>
    </div>
    <v-list
      v-if="checkShoppingList.length"
      class="pa-0 orange lighten-5"
      two-line
      flat
    >
      <!-- Each item in Shopping list -->
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
          <!-- tick box     -->
          <v-list-item-action>
            <v-checkbox :input-value="item.inCart" color="light-green darken-4">
            </v-checkbox>
          </v-list-item-action>
          <!-- tick box ends -->

          <!-- Item list text -->
          <v-list-item-content>
            <v-list-item-title
              :class="{ 'text-decoration-line-through': item.inCart }"
            >
              {{ item.item }}
            </v-list-item-title>
          </v-list-item-content>
          <v-avatar size="20">
              <Avatar
                v-if="item.creatorURL === undefined"
                :username="item.creatorid"
                :size="50"
              ></Avatar>
              <v-img v-else :src="item.creatorURL"></v-img>
            </v-avatar>
          <!-- Item list text ends -->

          <!-- Item Menu Ends -->
        </v-list-item>
        <!-- Border Between Items -->
        <v-divider :key="item.id"></v-divider>
      </div>
      <!-- Each item in Shopping List ends-->
    </v-list>
  </div>
</template>

<script>
import { DateTime } from "luxon";
import Avatar from "vue-avatar";

export default {
  name: "ShoppingList",
  components: {
    Avatar,
  },

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
        creatorURL: this.$store.state.user.photo_url,
        house_key: this.$store.state.user.house_keys[0],
      };

      await this.$store.dispatch("addNewShoppingListItem", newItem);
      await this.$store.dispatch(
        "getShoppingList",
        this.$store.state.user.house_keys[0]
      );

      this.newItem = "";
    },

    putItemInCart(id) {
      let item = this.checkShoppingList.filter((item) => item.id === id)[0];
      item.inCart = !item.inCart;
    },
    // Stopped here; must figure out how to build the array of checked items to send to store
    async clearCheckedItems() {
      let shoppingList = this.$store.state.shoppingList;
      let arr = shoppingList
        .filter((item) => item.inCart === true)
        .map((item) => item.id);
      await this.$store.dispatch("deleteAllCheckedShoppingItems", arr);
      await this.$store.dispatch(
        "getShoppingList",
        this.$store.state.user.house_keys[0]
      );
    },
  },
  computed: {
    checkShoppingList: function() {
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

#item-container {}
</style>


