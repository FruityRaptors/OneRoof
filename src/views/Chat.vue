<template>
  <div class="view chat">
    
<!-- chat section start -->
    <v-container id="chat-box" class="chat-box brown lighten-5" v-on:update="$vuetify.goTo(99999)" color="brown lighten-4">

<!-- message container starts -->
      <v-container
        elevation="0"
        v-for="message in messages"
        :key="message.id"
        :class="
          message.username == username
            ? 'text-right d-flex align-end flex-column mx-auto brown lighten-5 pr-0'
            : 'text-left d-flex align-start flex-column  mx-auto brown lighten-5'
        "
        >
        
<!-- Username and Avatar starts -->
        <v-container class="lighten-4 mb-0 pb-0 pl-0 pr-0" elevation="0" max-width="200">
          <v-avatar size="20">
            <Avatar :username="message.username" :size="20"></Avatar>
          </v-avatar>
          <v-card-subtitle class="d-inline-flex">
            {{message.username}}
          </v-card-subtitle>
        </v-container>
<!-- Username and Avatar ends -->

<!-- Message box starts -->
          <v-card
            rounded
            max-width="250"
            class="mb-2 mr-4 pa-2"
            :color="
              message.username == username ? 'orange light-3 white--text font-weight-light text-justify' : 'orange light-1 accent-1 font-weight-light'
            "
            >{{ message.content }}
            </v-card>
<!-- Message box ends -->


      </v-container>
<!-- message container ends -->

    </v-container>
<!-- chat section ends -->

<!-- input and send section start -->
    <v-footer
      class=""
      rounded
      max-height="100"
      color="brown lighten-4"
      padless
    >
        <v-text-field
          class="d-flex align-start mt-3 pl-5"
          type="text"
          v-model="inputMessage"
          placeholder="Write your message..."
          @keyup.enter="sendMessage(); ; $vuetify.goTo(99999)"
        />
        <v-btn 
        class="mr-2 brown lighten-4"
        fab
        @click.prevent="sendMessage(); ; $vuetify.goTo(99999)"
        elevation="0"
        >
          <v-icon
          color="brown"
          >
        mdi-send
          </v-icon>
        </v-btn>
    </v-footer>
<!-- input and send section start -->
  </div>
</template>


<script>
import firebase from "firebase";
import Avatar from "vue-avatar";

export default {
  name: "Chat",
  data() {
    return {
      inputMessage: "",
      messages: [],
      username: this.$store.state.user.username,
    };
  }, // Data ends

  components: {
    Avatar,
  }, //Components ends
  
  mounted() {
    const messagesRef = firebase
      .database()
      .ref(this.$store.state.user.house_keys[0])
      .limitToLast(50);

    messagesRef.on("value", (snapshot) => {
      const data = snapshot.val();
      let messages = [];

      Object.keys(data).forEach((key) => {
        messages.push({
          id: key,
          username: data[key].username,
          content: data[key].content,
        });
      });

      this.messages = messages;

      this.scrollBottom()
    });
  }, // Mounted Ends

  methods: {
    sendMessage() {
      const messagesRef = firebase
        .database()
        .ref(this.$store.state.user.house_keys[0]);

      if (this.inputMessage === "" || this.inputMessage === null) {
        return;
      }

      const message = {
        username: this.$store.state.user.username,
        content: this.inputMessage,
      };

      messagesRef.push(message);

      this.inputMessage = "";
    },
     scrollBottom(){
        return this.$vuetify.goTo(99999)
      }
  }, // Method ends
};
</script>

<style lang="scss">

</style>