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
                <!-- <a href="#" class="avatar rounded-circle mr-3">
                  <img alt="Image placeholder" :src="item.img" />
                </a> -->
                <div class="media-body">
                  <span class="name mb-0 text-sm">{{ item.title }}</span>
                </div>
              </div>
            </th>
            <td>
              <badge class="badge-dot mr-4" :type="item.statusType">
                <i :class="`bg-${item.statusType}`"></i>
                <span class="status">{{ item.status }}</span>
              </badge>
            </td>
            <td class="budget">
              {{ item.budget }}
            </td>
            <td class="budget">
              {{ item.budget }}
            </td>
            <td>
              {{ item.budget }}
            </td>

            <td>
              {{ item.budget }}
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
export default {
  name: "StockTable",
  props: {
    type: {
      type: String,
    },
    title: String,
  },
  methods: {
    pp(e) {
      console.log(e);
    },
  },
  data() {
    return {
      currentStockList: [],
      pastStockList: [],
      tableData: [
        {
          img: "img/theme/bootstrap.jpg",
          title: "Argon Design System",
          budget: "$2500 USD",
          status: "pending",
          statusType: "warning",
          completion: 60,
        },
        {
          img: "img/theme/angular.jpg",
          title: "Angular Now UI Kit PRO",
          budget: "$1800 USD",
          status: "completed",
          statusType: "success",
          completion: 100,
        },
        {
          img: "img/theme/sketch.jpg",
          title: "Black Dashboard",
          budget: "$3150 USD",
          status: "delayed",
          statusType: "danger",
          completion: 72,
        },
        {
          img: "img/theme/react.jpg",
          title: "React Material Dashboard",
          budget: "$4400 USD",
          status: "on schedule",
          statusType: "info",
          completion: 90,
        },
        {
          img: "img/theme/vue.jpg",
          title: "Vue Paper UI Kit PRO",
          budget: "$2200 USD",
          status: "completed",
          statusType: "success",
          completion: 100,
        },
      ],
    };
  },
  methods: {
    getCurrentStocksByCount(skip=0, limit=10){
      const currdate = new Date();
      const date = currdate.getDate()+"-"+currdate.getMonth()+"-"+currdate.getDate();
    },
    getPastStocksByCount(skip=0, limit=10){
      const currdate = new Date();
      const date = currdate.getDate()+"-"+currdate.getMonth()+"-"+currdate.getDate();
    }
  },
  beforeMount() {
    this.getCurrentStocksByCount();
  }
};
</script>
<style></style>
