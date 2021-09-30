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
            <th>Company</th>
            <th>Call Type</th>
            <th>Price</th>
            <th>Target</th>
            <th>Stop Loss</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody class="list">
          <tr v-for="(item, index) in tableData" :key="index">
            <th scope="row">
              <div class="media align-items-center">
                <div class="media-body">
                  <span class="name mb-0 text-sm" :class="returnClass(item)">{{
                    item.cryptoName
                  }}</span>
                </div>
              </div>
            </th>
            <td :class="returnClass(item)">
              {{ item.callType }}
            </td>
            <td :class="returnClass(item)">
              {{ item.price }}
            </td>
            <td :class="returnClass(item)">
              {{ item.target }}
            </td>
            <td :class="returnClass(item)">
              {{ item.stopLoss }}
            </td>
            <td :class="returnClass(item)">
              {{ item.date }}
            </td>

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
                <a class="dropdown-item" @click="del(item, item._id)"
                  >Delete Now!</a
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
  name: "CryptoTable",
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
    async del(item, id) {
      if (confirm("Do you want to delete the selected Call ?")) {
        await axios
          .delete(`/stock/${id}`)
          .then((response) => {
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
      if (!this.tableNo) {
        this.getCurrentCryptoByCount(
          "/crypto/current/count/",
          (d - 1) * this.perpagelimit,
          this.perpagelimit
        );
      } else {
        this.getCurrentCryptoByCount(
          "/crypto/past/count/",
          (d - 1) * this.perpagelimit,
          this.perpagelimit
        );
      }
    },
    returnClass(item) {
      return item.blocked ? "text-danger" : "text-white";
    },
    async getCurrentCryptoByCount(link, skip = 0, limit = 10) {
      const currdate = new Date().getDate();
      var currMonth = new Date().getMonth() + 1;
      currMonth = "0" + currMonth;
      const date =
        new Date().getFullYear() + "-" + currMonth.slice(-2) + "-" + currdate;
      const formData = {
        date: date,
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
    if (!this.tableNo) {
      this.getCurrentCryptoByCount("/crypto/current/count/", 0, 10);
    } else {
      this.getCurrentCryptoByCount("/crypto/past/count/", 0, 10);
    }
  },
};
</script>
<style></style>
