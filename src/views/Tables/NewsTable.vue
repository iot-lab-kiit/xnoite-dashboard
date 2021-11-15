<template>
  <div class="card shadow bg-default">
    <div class="card-header border-0 bg-transparent">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0 text-white">
            {{ title }}
          </h3>
        </div>
        <!-- <div class="col text-right">
          <base-button type="primary" size="sm">See all</base-button>
        </div> -->
      </div>
    </div>

    <div class="table-responsive">
      <table class="table tablesorter table-dark">
        <thead class="thead-dark">
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Source</th>
            <th></th>
          </tr>
        </thead>
        <tbody class="list">
          <tr v-for="(item, index) in tableData" :key="index">
            <th scope="row">
              <div class="media align-items-center">
                <div class="media-body">
                  <a href="#" class="avatar rounded-circle mr-3">
                    <img
                      alt="Image placeholder"
                      style="width: 50px; height: 50px"
                      :src="item.photourl"
                    />
                  </a>
                </div>
              </div>
            </th>
            <td :class="returnClass(item)">
              {{ item.title }}
            </td>
            <td :class="returnClass(item)">
              {{ item.source }}
            </td>
            <!-- <td :class="returnClass(item)">
              {{ item.description }}
            </td> -->

            <td class="text-right">
              <base-dropdown class="dropdown" position="right">
                <template v-slot:title>
                  <a
                    class="btn btn-sm btn-icon-only text-light"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i class="fas fa-ellipsis-v"></i>
                  </a>
                </template>
                <a class="dropdown-item" @click="deleteNews(item, item._id)"
                  >Delete</a
                >
              </base-dropdown>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      class="card-footer d-flex justify-content-end"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >
      <base-pagination
        :total="max"
        :perPage="perpagelimit"
        :value="page"
        @input="pagechange"
      ></base-pagination>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "NewsTable",
  props: {
    type: {
      type: String,
    },
    title: String,
    tableNo: Number,
  },
  data() {
    return {
      deleteLoader: false,
      tableData: [],
      page: 0,
      max: 50,
      perpagelimit: 5,
    };
  },
  methods: {
    async deleteNews(item, id) {
      if (confirm("Do you want to delete the selected news ?")) {
        await axios
          .delete(`/news/${id}`)
          .then((response) => {
            console.log(response.data);
            const index = this.tableData.indexOf(item);
            if (index > -1) {
              this.tableData.splice(index, 1);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    pagechange(d) {
      this.page = d;
      this.getCurrentCryptoByCount(
        "/news/count/",
        (d - 1) * this.perpagelimit,
        this.perpagelimit
      );
    },
    returnClass(item) {
      return item.blocked ? "text-danger" : "text-white";
    },
    async getNewsByCount(link, skip = 0, limit = 10) {
      const formData = {
        skip: skip,
        limit: limit,
      };
      await axios
        .post(link, formData)
        .then((response) => {
          this.tableData = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  beforeMount() {
    this.getNewsByCount("/news/count/", 0, 10);
  },
};
</script>
<style></style>
