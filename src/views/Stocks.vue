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
              <h2 class="text-white">Add Stock Call</h2>
              <br />
              <base-input label="Select Company"
                ><select
                  class="custom-select"
                  id="inputGroupSelect01"
                  v-model="company"
                >
                  <option selected>Choose Company ...</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </base-input>
              <base-input label="Select Call Type"
                ><select
                  class="custom-select"
                  id="inputGroupSelect02"
                  v-model="callType"
                >
                  <option selected>Choose Company ...</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </base-input>
              <div class="form-row">
                <div class="form-group col-md-4">
                  <label for="inputZip" class="form-control-label text-white"
                    >Price</label
                  >
                  <input
                    type="number"
                    class="form-control"
                    id="Price"
                    v-model="price"
                  />
                </div>
                <div class="form-group col-md-4">
                  <label for="inputZip" class="form-control-label text-white"
                    >Target</label
                  >
                  <input
                    type="number"
                    class="form-control"
                    id="Target"
                    v-model="target"
                  />
                </div>
                <div class="form-group col-md-4">
                  <label for="Stop" class="form-control-label text-white"
                    >Stop Loss</label
                  >
                  <input
                    type="number"
                    class="form-control"
                    id="Stop"
                    v-model="stopLoss"
                  />
                </div>
              </div>
              <base-input label="Select Date"
                ><input
                  type="date"
                  class="form-control"
                  id="Stop"
                  v-model="date"
                />
              </base-input>
              <base-button type="primary" class="my-4" v-on:click="createCall"
                >Create Call</base-button
              >
            </div>
          </card>
        </div>
      </div>
    </div>
    <div class="container-fluid mt-7">
      <div class="row mt-5">
        <div class="col">
          <StockTable
            type="dark"
            title="Current Calls (For Tommorow) "
          ></StockTable>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col">
          <StockTable type="dark" title="Past Calls"></StockTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StockTable from "./Tables/StockTable.vue";
export default {
  name: "Stock",
  components: {
    StockTable,
  },
  data() {
    return {
      company: "",
      callType: "",
      price: 0.0,
      target: 0.0,
      stopLoss: 0.0,
      date: "",
    };
  },
  methods: {
    createCall() {
      console.log(this.company);
      console.log(this.callType);
      console.log(this.price);
      console.log(this.target);
      console.log(this.stopLoss);
      console.log(this.date);
    },
  },
};
</script>