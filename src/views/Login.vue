<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4">
            <h1>Sign In</h1>
          </div>
          <form role="form">
            <div class="form-group input-group input-group-alternative">
              <div class="input-group-prepend">
                <div class="input-group-text">
                  <i class="ni ni-email-83"></i>
                </div>
              </div>
              <input
                v-model="email"
                placeholder="Email"
                class="form-control"
                aria-describedby="addon-right addon-left"
              />
            </div>

            <div class="form-group input-group input-group-alternative">
              <div class="input-group-prepend">
                <div class="input-group-text">
                  <i class="ni ni-lock-circle-open"></i>
                </div>
              </div>
              <input
                v-model="password"
                placeholder="Password"
                class="form-control"
                aria-describedby="addon-right addon-left"
              />
            </div>
            <div class="text-center">
              <base-button type="primary" class="my-4" v-on:click="signin"
                >Sign in</base-button
              >
            </div>
          </form>
        </div>
      </div>
      <br />
      <Spinner v-show="loading"></Spinner>
      <div v-if="errors.length">
        <div
          class="alert alert-danger"
          role="alert"
          v-for="error in errors"
          v-bind:key="error"
        >
          {{ error }}
        </div>
      </div>
      <div v-if="success">
        <div class="alert alert-success" role="alert">
          {{ signupMessage }}
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-6">
          <a href="#" class="text-light"><small>Forgot password?</small></a>
        </div>
        <div class="col-6 text-right">
          <router-link to="/register" class="text-light"
            ><small>Create new account</small></router-link
          >
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Spinner from "../components/Spinner.vue";
export default {
  name: "login",
  components: { Spinner },
  data() {
    return {
      email: "",
      password: "",
      errors: [],
      success: false,
      signupMessage: "",
      loading: false,
    };
  },
  methods: {
    async signin() {
      this.loading = true;
      this.errors = [];
      if (this.email === "") {
        this.errors.push("The email is missing");
        this.loading = false;
      }
      if (this.password === "") {
        this.errors.push("The password is missing");
        this.loading = false;
      }
      const formData = {
        email: this.email,
        password: this.password,
      };
      if (!this.errors.length) {
        await axios
          .post("/auth/", formData)
          .then((Response) => {
            this.signupMessage = Response.data.message;
            this.success = true;
            const token = Response.data.token;
            this.$store.commit("setToken", token);
            axios.defaults.headers.common["auth-token"] = token;
            localStorage.setItem("token", token);
            localStorage.setItem("userid", Response.data.user);
            setTimeout(() => this.$router.push({ path: "/" }), 500);
            this.loading = false;
          })
          .catch((err) => {
            console.log(err);
            if (err.message.includes("301")) {
              this.errors.push("Incorrect email");
            } else if (err.message.includes("302")) {
              this.errors.push("Incorrect password");
            } else this.errors.push("Server down!!");
            this.loading = false;
          });
      }
    },
  },
};
</script>
<style></style>
