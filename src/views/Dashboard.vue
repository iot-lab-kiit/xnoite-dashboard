<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      <div class="row">
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Total Users"
            type="gradient-red"
            :sub-title="userCount"
            icon="ni ni-active-40"
            class="mb-4 mb-xl-0"
          >
          </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Total Stock Calls"
            type="gradient-orange"
            :sub-title="stockCount"
            icon="ni ni-chart-pie-35"
            class="mb-4 mb-xl-0"
          >
          </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Total Crypto Calls"
            type="gradient-green"
            :sub-title="cryptCount"
            icon="ni ni-money-coins"
            class="mb-4 mb-xl-0"
          >
          </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Total News"
            type="gradient-info"
            :sub-title="newsCount"
            icon="ni ni-chart-bar-32"
            class="mb-4 mb-xl-0"
          >
          </stats-card>
        </div>
      </div>
    </base-header>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      userCount: 0,
      stockCount: 0,
      cryptCount: 0,
      newsCount: 0,
    };
  },
  methods: {
    async getCount(type){
      var count = 0;
      await axios.get(`/${type}/count`).then((response)=> {
        count = response.data.count;
      });
      return count;
    }
  },
  async mounted () {
    this.userCount = await this.getCount("user");
    this.stockCount = await this.getCount("stock");
    this.cryptCount = await this.getCount("user");
    this.newsCount = await this.getCount("user");
  },
};
</script>
<style></style>
