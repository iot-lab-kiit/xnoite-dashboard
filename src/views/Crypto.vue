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
              <h2 class="text-white">Add Crypto Call</h2>
              <br />
              <div class="form-group">
                <label for="Stop" class="form-control-label text-white"
                  >Crypto Name</label
                >
                <input
                  type="string"
                  class="form-control"
                  id="Stop"
                  v-model="cryptoName"
                />
              </div>
              <base-input label="Select Call Type"
                ><select
                  class="custom-select"
                  id="inputGroupSelect02"
                  v-model="callType"
                >
                  <option selected value="1">Choose Call Type ...</option>
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
            <Spinner v-show="loading"></Spinner>
          </card>
        </div>
      </div>
    </div>
    <div class="container-fluid mt-7">
      <div class="row mt-5">
        <div class="col">
          <CryptoTable
            type="dark"
            title="Current Calls (For Tommorow) "
            :tableNo="0"
          ></CryptoTable>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col">
          <CryptoTable
            type="dark"
            title="Past Calls"
            :tableNo="1"
          ></CryptoTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CryptoTable from "./Tables/CryptoTable.vue";
import axios from "axios";
import Spinner from "../components/Spinner.vue";
export default {
  name: "Crypto",
  components: {
    CryptoTable,
    Spinner,
  },
  data() {
    return {
      cryptoName: "",
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
        cryptoName: this.cryptoName,
        callType: this.callType,
        price: this.price,
        target: this.target,
        stopLoss: this.stopLoss,
        date: this.date,
      };
      await axios
        .post("/crypto", formData)
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