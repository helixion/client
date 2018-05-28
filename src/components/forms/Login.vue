<template>
  <form>
    <fieldset :class="{ 'is-disabled': sending }" :disabled="sending">
      <app-input 
        :label="inputs.email.label" 
        :id="inputs.email.id" 
        :validators="inputs.email.validators" 
        v-model="inputs.email.value"/>
      <app-input
        :label="inputs.password.label"
        :id="inputs.password.id"
        :validators="inputs.password.validators"
        v-model="inputs.password.value">
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

import Input from "./inputs/Input";

export default {
  components: { appInput: Input },

  $_veeValidate: {
    validator: "new"
  },

  data() {
    return {
      inputs: {
        email: {
          value: "",
          type: "text",
          id: "email",
          label: "EMAIL ADDRESS *",
          validators: {
            required: true,
            email: true
          }
        },
        password: {
          value: "",
          type: "password",
          id: "password",
          label: "PASSWORD *",
          validators: {
            required: true,
            min: 8,
            max: 20
          }
        }
      },
      sending: false
    };
  },

  computed: {
    isDisabled() {
      const { inputs } = this;
      return Object.keys(inputs).some(key => !inputs[key].value);
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
      const { email, password } = this.inputs;
      this.sending = true;
      try {
        const res = await this.$store.dispatch("authenticate", {
          email: email.value,
          password: password.value
        });

        if (res.status >= 200 && res.status < 304) {
          this.sending = false;
          this.clearForm();
        }
      } catch (e) {
        if (e.response) {
          const message = `[${e.response.status}]:${e.response.data.message}`;
          const options = {
            theme: "primary",
            duration: 5000,
            icon: "exclamation-trinagle",
            className: ["bis-notification", "danger"]
          };
          this.$toasted.show(message, options);
          Object.keys(e.response).forEach(err => console.log(e.response[err]));
        }
        this.sending = false;
      }
    },

    clearForm() {
      const { inputs } = this.$data;
      Object.keys(inputs).forEach(key => {
        inputs[key].value = "";
      });
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
