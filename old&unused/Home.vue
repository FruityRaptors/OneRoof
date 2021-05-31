<template>
  <div v-if="this.$store.state.isUserLoggedIn !== true">
    <h1>Please click above to login or register!</h1>
  </div>
  <div v-else>
    <h1>Here's where the chat will go!</h1>  
  </div>
</template>

