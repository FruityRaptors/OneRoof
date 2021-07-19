<template>
  <v-card class="mx-auto mt-5 orange lighten-5" elevation="0" max-width="95%">
    <v-card class="d-flex justify-center orange lighten-5" elevation="0">
      <v-card-title class="font-weight-bold"> Modules Settings </v-card-title>
    </v-card>

    <v-list v-for="(module, key) in modules" :key="module.id" elevation="0">
      <v-list-item @click="updateModule(key)">
        <v-list-item-action>
          <v-checkbox
            :input-value="module.purchased"
            color="light-green darken-4"
          ></v-checkbox>
        </v-list-item-action>

        <v-list-item-title>
          {{ module.title }}
          <span class="limited-time">Free for a limited time!</span>
        </v-list-item-title>
      </v-list-item>
    </v-list>

    <div class="text-center">
      <v-btn class="mt-5" color="orange lighten-1" dark @click="submitUpdate">
        SUBMIT
      </v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "Modules",

  data() {
    return {
      moduleState: this.$store.state.currentHouseModules,
    };
  },
  methods: {
    updateModule(module) {
      this.moduleState[module].purchased = !this.moduleState[module].purchased;
    },

    async submitUpdate() {
      let payload = {
        house_key: this.$store.state.user.house_keys[0],
        modules: this.moduleState,
      };
      await this.$store.dispatch("updateModules", payload);

      this.$router.push("/yourhome");
    },
  },
  computed: {
    modules: function() {
      let result = {};

      let moduleList = this.$store.state.currentHouseModules;

      for (let module in moduleList) {
        if (moduleList[module].purchasable) {
          result[module] = moduleList[module];
        }
      }
      return result;
    },
  },
};
</script>

<style scoped>
.limited-time {
  color: blue;
  font-size: 0.8em;
  font-style: italic;
}
.coming-soon {
  color: red;
  font-size: 0.8em;
  font-style: italic;
}
.greyed-out {
  background-color: rgb(207, 207, 207);
}
</style>
