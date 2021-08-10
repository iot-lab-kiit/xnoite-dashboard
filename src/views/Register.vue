<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4">
            <br />
            <br />
            <h1>Sign up</h1>
          </div>

          <form role="form" class="form-row">
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

            <div class="form-group input-group input-group-alternative">
              <div class="input-group-prepend">
                <div class="input-group-text">
                  <i class="ni ni-lock-circle-open"></i>
                </div>
              </div>
              <input
                v-model="password2"
                placeholder="Re-Enter Password"
                class="form-control"
                aria-describedby="addon-right addon-left"
              />
            </div>
            <div class="text-center">
              <base-button type="primary" class="my-4" v-on:click="signup"
                >Create account</base-button
              >
            </div>
            <br />
          </form>
        </div>
      </div>
      <br />
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
          <a href="#" class="text-light">
            <small>Forgot password?</small>
          </a>
        </div>
        <div class="col-6 text-right">
          <router-link to="/login" class="text-light">
            <small>Login into your account</small>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "register",
  data() {
    return {
      password2: "",
      email: "",
      password: "",
      errors: [],
      success: false,
      signupMessage: "",
    };
  },
  methods: {
    async signup() {
      this.errors = [];
      if (this.email === "") {
        this.errors.push("The email is missing");
      }
      if (this.password === "") {
        this.errors.push("The password is missing");
      }
      if (this.password !== this.password2) {
        this.errors.push("The password does not match");
      }
      const formData = {
        email: this.email,
        password: this.password,
        blocked: true,
        photoUrl: "https://img.icons8.com/bubbles/2x/admin-settings-male.png"
      };
      if (!this.errors.length) {
        await axios
          .post("/auth/signup", formData)
          .then((Response) => {
            this.signupMessage = Response.data.message;
            this.success = true;
            setTimeout(() => this.$router.push({ path: "/login" }), 2000);
          })
          .catch((err) => {
            if (err.message.includes("301")) {
              this.errors.push("Email already exist");
            } else this.errors.push("Server down!!");
          });
      }
    },
  },
};
</script>
<style></style>
