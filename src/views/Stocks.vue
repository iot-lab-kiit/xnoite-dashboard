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
              <div class="form-group">
                <label for="Stop" class="form-control-label text-white"
                  >Company Name</label
                >
                <input
                  type="string"
                  class="form-control"
                  id="Stop"
                  v-model="company"
                />
              </div>
              <base-input label="Select Call Type"
                ><select
                  class="custom-select"
                  id="inputGroupSelect02"
                  v-model="callType"
                >
                  <option value="Intraday">Intraday</option>
                  <option value="Swing">Swing</option>
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

            <Spinner v-show="loading"></Spinner>
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
            :tableNo=0
          ></StockTable>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col">
          <StockTable type="dark" title="Others"
            :tableNo=1></StockTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StockTable from "./Tables/StockTable.vue";
import axios from "axios";
import Spinner from "../components/Spinner.vue";
export default {
  name: "Stock",
  components: {
    StockTable,
    Spinner,
  },
  data() {
    return {
      company: "",
      callType: "",
      price: 0.0,
      target: 0.0,
      stopLoss: 0.0,
      date: "",
      loading: false,
    };
  },
  methods: {
    async createCall() {
      this.loading = true;
      const formData = {
        companyName: this.company,
        callType: this.callType,
        price: this.price,
        target: this.target,
        stopLoss: this.stopLoss,
        date: this.date,
      };
      await axios
        .post("/stock", formData)
        .then((response) => {
          console.log(response.data);
          setTimeout(() => this.$router.go(this.$router.currentRoute), 500);
        })
        .catch((err) => {
          console.log(err);
        });
      this.loading = false;
    },
  },
};
</script>