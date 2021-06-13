<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="orange lighten-2 black--text mb-5" rounded dark v-bind="attrs" v-on="on" @click="progressBar=false ; selectPhoto=true">
          Upload Photo
        </v-btn>
      </template>
      <v-card class="orange lighten-5 text-center">
      
      <v-card class="d-flex justify-center orange lighten-5" elevation="0">
         <v-card-title class="headline">
          Upload a Photo
        </v-card-title>
      </v-card>
       
        <v-card-text>
        
          <v-container>
            
            <v-btn v-if="selectPhoto" color="orange lighten-1" @click="$refs.inputUpload.click()">Select Photo</v-btn>
            
              <input v-show="false"  ref="inputUpload" type="file" @change="previewImage" accept="image/*" />

            <div v-if="progressBar">
                Progress: {{ uploadValue.toFixed() + "%" }}
                <progress
                  id="progress"
                  :value="uploadValue"
                  max="100"
                ></progress>
            </div>

            <v-avatar v-if="imageData != null" class="ma-3" size="200">
              <v-img class="preview" :src="this.picture"></v-img>
            </v-avatar>
      
          </v-container>

        </v-card-text>
        <v-card-actions class="d-flex justify-space-around">
          <v-btn v-if="imageData != null" color="orange darken-3" text @click="$refs.inputUpload.click()">
            Reselect
          </v-btn>

          <v-btn color="orange darken-3" text @click="dialog=false ; selectPhoto=true ; picture=null ; imageData=null">
            Close
          </v-btn>

          <v-btn v-if="imageData != null" color="orange darken-3" text @click="onUpload" >
            Upload
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
    selectPhoto: true,
    progressBar: false,
  }),
  methods: {
    previewImage(event) {
      this.selectPhoto = false;
      this.uploadValue = 0;
      this.picture = URL.createObjectURL(event.target.files[0])
      this.imageData = event.target.files[0];
    },

    onUpload() {
      this.progressBar = true
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
            this.$store.dispatch("updateUserPhoto", { url: url, email: email})
          });
        }
      );
    },
  },
};
</script>

<style scoped>

</style>