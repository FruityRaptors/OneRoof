<template>
  <div class="view chat">
    
<!-- chat section start -->
    <v-container id="chat-box" class="chat-box brown lighten-4" v-on:update="$vuetify.goTo(99999)" color="brown lighten-4">

<!-- message container starts -->
      <v-card
        elevation="0"
        v-for="message in messages"
        :key="message.id"
        :class="
          message.username == username
            ? 'text-right d-flex align-end flex-column mx-auto brown lighten-4 pr-0 mb-0'
            : 'text-left d-flex align-start flex-column  mx-auto brown lighten-4 mb-0'
        "
        >
        
<!-- Username and Avatar starts -->
        <v-subheader class="lighten-4 mb-0 pa-0" elevation="0" max-width="200" height="20">
          <v-avatar size="20">
            <Avatar :username="message.username" :size="20"></Avatar>
          </v-avatar>
          <v-card-subtitle class="d-inline-flex">
            {{message.username}}
          </v-card-subtitle>
        </v-subheader>
<!-- Username and Avatar ends -->

<!-- Message box starts -->
          <v-card
            rounded
            max-width="250"
            class="mb-2 mr-4 pa-2"
            :color="
              message.username == username ? 'brown lighten-1 white--text font-weight-light text-justify' : 'brown lighten-3 font-weight-light'
            "
            >{{ message.content }}
          </v-card>
<!-- Message box ends -->


      </v-card>
<!-- message container ends -->

    </v-container>
<!-- chat section ends -->

<!-- input and send section start -->
    <v-footer
      class=""
      rounded
      max-height="100"
      color="brown lighten-3"
      padless
    >
        <v-text-field
          class="d-flex align-start mt-3 pl-5"
          type="text"
          v-model="inputMessage"
          placeholder="Write your message..."
          @keyup.enter="sendMessage(); $vuetify.goTo(99999)"
        />
        <v-btn 
        class="mr-2 brown lighten-3"
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
      lastMessage: ''
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

      this.lastMessage = this.messages[this.messages.length - 1].username

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

      this.lastMessage = this.messages[this.messages.length - 1].username

      this.inputMessage = "";
    },
     scrollBottom(){
        return this.$vuetify.goTo(99999)
      },
  }, // Method ends
};
</script>

<style lang="scss">

</style>