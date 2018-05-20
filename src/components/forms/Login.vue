<template>
  <form>
    <fieldset :class="{ 'is-disabled': sending }" :disabled="sending">
      <app-input 
      :name="'Email Address *'" 
      :email="true" 
      :required="true" 
      :id="'loginEmail'" 
      v-model="email"></app-input>
    <app-input 
      :password="true" 
      :name="'Password *'" 
      :min="8" 
      :max="20" 
      :required="true" 
      :id="'loginPassword'" 
      v-model="password">
      <a class="forgotpwd" @click.prevent="$emit('setForm', 'app-password-recovery')">Forgot Password?</a>
      </app-input>
    <div class="field is-grouped">
        <div class="control is-expanded">
          <button :class="buttonClasses" @click.prevent="authenticate" :disabled="isDisabled || errors.any()">Sign In</button>
        </div>
        <div class="control is-expanded">
          <button class="button is-medium is-outlined is-info is-fullwidth" @click.prevent="clearForm">Reset</button>
        </div>
    </div>
    </fieldset>
  </form> 
</template>

<script>
"use strict";

import Input from "./inputs/ModalInput";

export default {
  components: { appInput: Input },

  $_veeValidate: {
    validator: "new"
  },

  data() {
    return {
      email: "",
      password: "",
      sending: false
    };
  },

  computed: {
    isDisabled() {
      const { email, password } = this.$data;
      return !email || !password;
    },

    buttonClasses() {
      return [
        "button is-medium is-fullwidth is-info",
        { "is-loading": this.sending }
      ];
    }
  },

  methods: {
    async authenticate() {
      const { email, password } = this.$data;
      this.sending = true;
      try {
        const res = await this.$store.dispatch("authenticate", {
          email,
          password
        });

        if (res.status >= 200 && res.status < 304) {
          this.sending = false;
          this.clearForm();
        }
      } catch (e) {
        if (e.response.status) {
          this.$notify({
                group: "notes",
                type: "danger",
                text: e.response.data.message
              });
          // switch (e.response.status) {
          //   case 404:
          //     this.$notify({
          //       group: "notes",
          //       type: "danger",
          //       text: "User credentials invalid or user doesn't exist."
          //     });
          //     break;
          //   case 403:
          //     this.$notify({
          //       group: "notes",
          //       type: "danger",
          //       text:
          //         "Too many failed login attempts. Your account has been locked for 6 hours. To regain access to your account, please reset your password."
          //     });
          //     break;
          //   case 400:
          //     this.$notify({
          //       group: "notes",
          //       type: "danger",
          //       text: "Password was incorrect."
          //     });
          //     break;
          //   default:
          //     this.$notify({
          //       group: "notes",
          //       type: "danger",
          //       text: "Internal Server Error"
          //     });
          //     break;
          // }
        }
        this.sending = false;
      }
    },

    clearForm() {
      for (let key in this.$data) {
        if (typeof this.$data[key] === "string") {
          this.$data[key] = "";
        }
      }
    }
  }
};
</script>


<style>
.forgotpwd {
  float: right;
  font-size: 12px;
}
</style>
