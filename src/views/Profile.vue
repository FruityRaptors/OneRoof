<template>
  <div>
    <h1>Hello, {{ this.username }}</h1>
    <button @click="logout">Logout</button>
    <UpdateUser @setProfilePageUsername="changeUsername" />
    <UpdatePhoto />
  </div>
</template>

<script>
import UpdateUser from "../components/UpdateUser";
import UpdatePhoto from "../components/UpdatePhoto";
export default {
  name: "Profile",
  data() {
    return {
      username: "",
      email: "",
    };
  },
  components: {
    UpdateUser,
    UpdatePhoto
  },

  mounted() {
    this.username = this.$store.state.user.username;
    this.email = this.$store.state.user.email;
  },

  methods: {
    logout() {
      this.$store.dispatch("logoutUser");
    },
    changeUsername(username) {
      this.username = username;
      this.$store.dispatch("changeUsername", { email: this.email, newUsername: username})
    },
  },
};
</script>


<v-file-input show-size counter label="Upload a profile pic"></v-file-input>