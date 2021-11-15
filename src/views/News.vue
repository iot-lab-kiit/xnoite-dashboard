<template>
  <div>
    <base-header
      type="gradient-success"
      class="pb-6 pb-8 pt-5 pt-md-8"
    ></base-header>

    <div class="container-fluid mt--7">
      <!--Charts-->
      <div class="row">
        <div class="col-xl-8 mb-5 mb-xl-0">
          <card type="default" header-classes="bg-transparent">
            <div class="form-group mb-0">
              <h2 class="text-white">Add News</h2>
              <br />
              <div class="form-group">
                <label for="Stop" class="form-control-label text-white"
                  >News Title</label
                >
                <input
                  type="string"
                  class="form-control"
                  id="title"
                  v-model="title"
                />
                <label for="Stop" class="form-control-label text-white"
                  >News Source</label
                >
                <input
                  type="string"
                  class="form-control"
                  id="source"
                  v-model="source"
                />
                <label for="Stop" class="form-control-label text-white"
                  >News Source Link</label
                >
                <input
                  type="string"
                  class="form-control"
                  id="link"
                  v-model="link"
                />
                <div class="row">
                  <div class="col-md-12">
                    <base-input
                      alternative=""
                      label="Description"
                      placeholder="Collection's Description"
                      input-classes="form-control-alternative"
                      v-model="description"
                    >
                      <textarea
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        v-model="description"
                        placeholder="Write a large text here ..."
                      ></textarea>
                    </base-input>
                  </div>
                </div>
                <label class="form-control-label text-white">
                  News Photo
                  <span v-if="required">*</span>
                </label>
                <br />
                <input
                  id="dpPhotoUrl"
                  name="dpPhotoUrl"
                  type="file"
                  class="file"
                  data-browse-on-zone-click="true"
                  data-allowed-file-extensions='["png"]'
                  @change="PhotoUrl"
                />
              </div>
              <base-button
                type="primary"
                class="my-4"
                v-on:click="AddNews"
                v-show="!loading"
                >Create News</base-button
              >
              <div v-show="loading">
                <loader v-show="loading" /> {{ loadPercentage }}
              </div>
            </div>
          </card>
        </div>
      </div>
    </div>
    <div class="container-fluid mt-7">
      <div class="row mt-5">
        <div class="col">
          <NewsTable type="dark" title="News"></NewsTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import NewsTable from "./Tables/NewsTable.vue";
import Loader from "../components/Loader.vue";
export default {
  name: "News",
  components: {
    NewsTable,
    Loader,
  },
  data() {
    return {
      title: "",
      description: "",
      source: "",
      link: "",
      files: [],
      errors: [],
      loading: false,
      loadPercentage: "",
    };
  },
  methods: {
    PhotoUrl(event) {
      this.files = event.target.files;
    },
    async AddNews() {
      this.loading = true;
      this.loadPercentage = "Starting news photo upload";
      this.success = false;
      //audiobook collection dp
      const dpfilename = Date.now();
      var dpFormData = new FormData();
      const myNewDpFile = new File([this.files[0]], dpfilename + ".png", {
        type: this.files[0].type,
      });
      dpFormData.append("upload", myNewDpFile);
      this.loadPercentage = "Starting Audio Book Dp upload";
      var config = {
        onUploadProgress: (progressEvent) => {
          this.loadPercentage =
            (((progressEvent.loaded / progressEvent.total) * 100) | 0) + "%";
        },
      };
      await axios
        .post("/upload/news/", dpFormData, config)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (response) {
          console.log(response);
        });
      this.loadPercentage = "Starting news creation";
      const formData = {
        title: this.title,
        description: this.description,
        photourl:
          "https://xonitestorage.blob.core.windows.net/news/" +
          dpfilename +
          ".png",
        source: this.source,
        link: this.link,
      };
      console.log(formData);
      await axios
        .post("/news/", formData)
        .then((Response) => {
          this.signupMessage = Response.data.message;
          this.success = true;
          setTimeout(() => this.$router.go(this.$router.currentRoute), 500);
        })
        .catch((err) => {
          if (err.message.includes("400")) {
            this.errors.push("errors");
          } else this.errors.push("Server down!!");
        });
      this.loadPercentage = "AudioBook Added succesfully";
      this.loading = false;
    },
  },
};
</script>