<template>
  <div>
    <h1>Hello, {{ this.username }}</h1>
    <button @click="logout">Logout {{ this.username }}</button>
    <UpdateUser @setProfilePageUsername="changeUsername" />
  </div>
</template>

<script>
import UpdateUser from "../components/UpdateUser";
export default {
  name: "Profile",
  data() {
    return {
      username: "",
    };
  },
  components: {
    UpdateUser,
  },

  mounted() {
    this.username = this.$store.state.user.username;
  },

  methods: {
    logout() {
      this.$store.dispatch("logoutUser");
    },
    changeUsername(username) {
      this.username = username;
    },
  },
};
</script>
