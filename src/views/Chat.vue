<template>
  <v-card class="orange lighten-5" elevation="0">
<!-- chat section start -->
    <v-card id="chat-box" class="chat-box orange lighten-5" v-on:update="$vuetify.goTo(99999)" color="brown lighten-4" elevation="0">

      <v-card elevation="0" class="pb-10 mb-10 orange lighten-5 mx-auto">
<!-- message container starts -->
      <v-card
        elevation="0"
        v-for="message in messages"
        :key="message.id"
        :class="
          message.username == username
            ? 'text-right d-flex align-end flex-column mx-auto orange lighten-5 pr-0 mb-0'
            : 'text-left d-flex align-start flex-column  mx-auto orange lighten-5 mb-0 pl-3'
        "
        >
        
<!-- Username and Avatar starts -->
        <v-subheader class="lighten-4 mb-0 pa-0" elevation="0" max-width="200" height="20">

          <v-avatar size="30">
            <Avatar v-if="!message.image" :username="message.username" :size="20"></Avatar>
            <v-img v-else :src="message.image" ></v-img>
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
            class="mr-4 pa-2"
            elevation="0"
            :color="
              message.username == username ? 'orange accent-2 font-weight-normal text-justify' : 'orange accent-1 font-weight-normal'
            "
            >{{ message.content }}
          </v-card>
          <v-card-subtitle class="d-inline-flex">
            {{message.timestamp}}
          </v-card-subtitle>
<!-- Message box ends -->


      </v-card>
<!-- message container ends -->

</v-card>

    </v-card>
<!-- chat section ends -->

<!-- input and send section start -->
    <v-footer
      class=""
      rounded
      max-height="90"
      color="orange lighten-4"
      padless
      fixed
    >
        <v-text-field
          class="d-flex align-start mt-3 pl-5"
          type="text"
          v-model="inputMessage"
          placeholder="Write your message..."
          dense
          rounded
          filled
          @keyup.enter="sendMessage(); ; $vuetify.goTo(99999)"
        />
        <v-btn 
        class="mr-2 mb-3 orange lighten-4"
        fab
        @click.prevent="sendMessage(); ; $vuetify.goTo(99999)"
        elevation="0"
        >
          <v-icon
          size="30"
          color="orange darken-1"
          >
        mdi-send
          </v-icon>
        </v-btn>
    </v-footer>
<!-- input and send section start -->
 </v-card>
</template>


<script>
import firebase from "firebase";
import Avatar from "vue-avatar";
import { DateTime } from "luxon";

export default {
  name: "Chat",
  data() {
    return {
      inputMessage: "",
      messages: [],
      username: this.$store.state.user.username,
      lastMessage: '',
    };
  }, // Data ends

  components: {
    Avatar,
  }, //Components ends
  
  created() {
    const messagesRef = firebase
      .database()
      .ref(this.$store.state.user.house_keys[0])
      .limitToLast(50);

    messagesRef.on("value", (snapshot) => {
      const data = snapshot.val();
      let messages = [];

      if(!data){
       return
      }

      Object.keys(data).forEach((key) => {
        messages.push({
          id: key,
          username: data[key].username,
          content: data[key].content,
          image: data[key].image,
          timestamp: DateTime.fromISO(data[key].timestamp).toRelative({ days: 1 }),
          seen: true
        });
      });

      this.messages = messages;

    this.$store.dispatch("getHouseName", this.$store.state.user.house_keys[0])

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
        image: this.$store.state.user.photo_url,
        timestamp: DateTime.now().toISO(),
        seen: false,
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