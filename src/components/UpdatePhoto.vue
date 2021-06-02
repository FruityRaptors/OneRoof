<template>
<div></div>
</template>

<script>
export default {
  name: "UpdatePhoto",
  data: () => ({
    dialog: false,
    username: "",
  }),
  methods: {
    updateUsername() {
      this.$store.commit("setUsername", this.username);
      this.$emit("setProfilePageUsername", this.username);
      this.username = "";
      this.dialog = false;
    },
  },
};
</script>