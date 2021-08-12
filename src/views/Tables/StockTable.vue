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
                  <span class="name mb-0 text-sm" :class=returnClass(item)>{{ item.companyName }}</span>
                </div>
              </div>
            </th>
            <td :class=returnClass(item)>
              {{ item.callType }}
            </td>
            <td :class=returnClass(item)>
              {{ item.price }}
            </td>
            <td :class=returnClass(item)>
              {{ item.target }}
            </td>
            <td :class=returnClass(item)>
              {{ item.stopLoss }}
            </td>
            <td :class=returnClass(item)>
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
                <a class="dropdown-item" @click="pp(item.budget)"
                  >Expire Now!</a
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
      <base-pagination :pageCount="3" :perPage="5" :value="2"></base-pagination>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "StockTable",
  props: {
    type: {
      type: String,
    },
    title: String,
    tableNo: Number,
  },
  methods: {
    pp(e) {
      console.log(e);
    },
  },
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    returnClass(item) {
      return item.blocked ? "text-danger" : "text-white";
    },
    async getCurrentStocksByCount(link, skip = 0, limit = 10) {
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
          console.log(this.tableData.length);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  beforeMount() {
    if (!this.tableNo) {
      this.getCurrentStocksByCount("/stock/current/count/", 0, 10);
    } else {
      this.getCurrentStocksByCount("/stock/past/count/", 0, 10);
    }
  },
};
</script>
<style></style>
