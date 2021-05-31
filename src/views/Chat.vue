<template>
  <div class="view chat">
    
<!-- chat section start -->
    <v-container id="chat-box" class="chat-box" v-on:update="$vuetify.goTo(99999)">

<!-- message container starts -->
      <v-container
        elevation="0"
        v-for="message in messages"
        :key="message.id"
        :class="
          message.username == username
            ? 'text-right d-flex align-end flex-column mx-auto'
            : 'text-left d-flex align-start flex-column  mx-auto'
        "
        >
        
<!-- Username and Avatar starts -->
        <v-container class="lighten-4 mb-0 pb-0 pl-0" elevation="0" max-width="200">
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
              message.username == username ? 'orange light-3 white--text font-weight-medium text-justify' : 'orange light-1 accent-1 font-weight-medium'
            "
            >{{ message.content }}
            </v-card>
<!-- Message box ends -->


      </v-container>
<!-- message container ends -->

    </v-container>
<!-- chat section ends -->

<!-- input and send section start -->
    <footer>
      <v-form @submit.prevent="sendMessage(); $vuetify.goTo(99999)">
        <input
          type="text"
          v-model="inputMessage"
          placeholder="Write your message..."
        />
        <input type="submit" value="Send" />
      </v-form>
    </footer>
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
* {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.view {
  display: flex;
  justify-content: center;
  min-height: 100vh;
  background-color: whitesmoke;

  &.login {
    align-items: center;
    .login-form {
      display: block;
      width: 100%;
      padding: 15px;

      .form-inner {
        display: block;
        background-color: #fff;
        padding: 50px 15px;
        border-radius: 16px;
        box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
        h1 {
          color: #aaa;
          font-size: 28px;
          margin-bottom: 30px;
        }
        label {
          display: block;
          margin-bottom: 5px;
          color: #aaa;
          font-size: 16px;
          transition: 0.4s;
        }
        input[type="text"] {
          appearance: none;
          border: none;
          outline: none;
          background: none;
          display: block;
          width: 100%;
          padding: 10px 15px;
          border-radius: 8px;
          margin-bottom: 15px;

          color: #333;
          font-size: 18px;
          box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
          background-color: #f3f3f3;
          transition: 0.4s;
          &::placeholder {
            color: #888;
            transition: 0.4s;
          }
        }
        input[type="submit"] {
          appearance: none;
          border: none;
          outline: none;
          background: none;
          display: block;
          width: 100%;
          padding: 10px 15px;
          background-color: darkgoldenrod;
          border-radius: 8px;
          color: #fff;
          font-size: 18px;
          font-weight: 700;
        }
        &:focus-within {
          label {
            color: darkgoldenrod;
          }
          input[type="text"] {
            background-color: #fff;
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
            &::placeholder {
              color: #666;
            }
          }
        }
      }
    }
  }
  &.chat {
    flex-direction: column;
    header {
      position: relative;
      display: block;
      width: 100%;
      padding: 50px 30px 10px;
      .logout {
        position: absolute;
        top: 15px;
        right: 15px;
        appearance: none;
        border: none;
        outline: none;
        background: none;

        color: #fff;
        font-size: 18px;
        margin-bottom: 10px;
        text-align: right;
      }
      h1 {
        color: #fff;
      }
    }
    chat-box {
      border-radius: 24px 24px 0px 0px;
      background-color: #fff;
      box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);
      flex: 1 1 100%;
      padding: 30px;
      .message {
        display: flex;
        margin-bottom: 15px;

        .message-inner {
          .username {
            color: #888;
            font-size: 16px;
            margin-bottom: 5px;
            padding-left: 15px;
            padding-right: 15px;
          }
          .content {
            display: inline-block;
            padding: 10px 20px;
            background-color: #f3f3f3;
            border-radius: 999px;
            color: #333;
            font-size: 18px;
            line-height: 1.2em;
            text-align: left;
          }
        }
        &.current-user {
          margin-top: 30px;
          justify-content: flex-end;
          text-align: right;
          .message-inner {
            max-width: 75%;
            .content {
              color: #fff;
              font-weight: 600;
              background-color: #ea526f;
            }
          }
        }
      }
    }
    footer {
      position: sticky;
      bottom: 0px;
      background-color: #fff;
      padding: 30px;
      box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);
      form {
        display: flex;
        input[type="text"] {
          flex: 1 1 100%;
          appearance: none;
          border: none;
          outline: none;
          background: none;
          display: block;
          width: 100%;
          padding: 10px 15px;
          border-radius: 8px 0px 0px 8px;

          color: #333;
          font-size: 18px;
          box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
          background-color: #f3f3f3;
          transition: 0.4s;
          &::placeholder {
            color: #888;
            transition: 0.4s;
          }
        }

        input[type="submit"] {
          appearance: none;
          border: none;
          outline: none;
          background: none;
          display: block;
          padding: 10px 15px;
          border-radius: 0px 8px 8px 0px;
          background-color: rgb(50, 87, 209);
          color: #fff;
          font-size: 18px;
          font-weight: 700;
        }
      }
    }
  }
}
</style>