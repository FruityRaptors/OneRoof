<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Upload a Photo
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Upload a photo</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <div>
              <input type="file" @change="previewImage" accept="image/*" />
            </div>
            <div>
              <p>
                Progress: {{ uploadValue.toFixed() + "%" }}
                <progress
                  id="progress"
                  :value="uploadValue"
                  max="100"
                ></progress>
              </p>
            </div>
            <div v-if="imageData != null">
              <img class="preview" :src="picture" />
              <br />
              <button @click="onUpload">Upload</button>
            </div>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import firebase from "firebase";

export default {
  name: "UpdateUser",
  data: () => ({
    dialog: false,
    imageData: null,
    picture: null,
    uploadValue: 0,
  }),
  methods: {
    previewImage(event) {
      this.uploadValue = 0;
      this.picture = null;
      this.imageData = event.target.files[0];
    },

    onUpload() {
      this.picture = null;
      const storageRef = firebase
        .storage()
        .ref(`${this.imageData.name}`)
        .put(this.imageData);
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            let email = this.$store.state.user.email
            this.picture = url;
            this.$store.dispatch("updateUserPhoto", { url: url, email: email})
          });
        }
      );
    },
  },
};
</script>

<style scoped>
.preview {
  height: 100px;
}
</style>