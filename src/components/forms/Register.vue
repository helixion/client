<template>
    <form v-if="!success">
      <fieldset :class="{ 'disabled': sending }" :disabled="sending">
        <app-input v-for="(input, i) in inputs" :key="i" 
        v-model="input.value" 
        :label="input.label" 
        :type="input.type" 
        :id="input.id"
        :validators="input.validators"/>
        <div class="field">
          <div class="control recaptcha">
            <vue-recaptcha
            theme="dark"
            ref="recaptcha" 
            :sitekey="site_key" 
            @expired="onExpire" 
            @verify="onVerify"/>
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control is-expanded">
            <button :class="buttonClasses" @click.prevent="createNewUser" :disabled="isDisabled || errors.any()">Create Account</button>
          </div>
          <div class="control is-expanded">
          <button class="button is-medium is-fullwidth is-info" @click.prevent="clearForm">Reset</button>
          </div>
        </div>
      </fieldset>
    </form>
    <div class="content" v-else>
        <h1>Thanks for registering.</h1>
        <p>Instructions on how to activate your account have been sent to your email address.</p>
        <button class="button is-fullwidth is-medium is-primary" @click.prevent="success = false">Go Back</button>
    </div>
</template>

<script>
import Input from "./inputs/Input";
import VueRecaptcha from "vue-recaptcha";
export default {
  components: {
    appInput: Input,
    VueRecaptcha
  },

  $_veeValidate: {
    validator: "new"
  },

  data() {
    return {
      inputs: {
        email: {
          value: "",
          label: "EMAIL ADDRESS *",
          type: "text",
          id: "email",
          validators: {
            email: true,
            required: true
          }
        },
        fullname: {
          value: "",
          label: "FULL NAME *",
          type: "text",
          id: "fullname",
          validators: {
            required: true,
            alpha_spaces: true,
            min: 8
          }
        },
        username: {
          value: "",
          label: "USERNAME *",
          type: "text",
          id: "username",
          validators: {
            required: true,
            alpha_spaces: true,
            min: 3,
            max: 10
          }
        },
        password: {
          value: "",
          label: "PASSWORD *",
          type: "password",
          id: "password",
          validators: {
            required: true,
            alpha_num: true,
            min: 8,
            max: 20
          }
        }
      },
      site_key: "6Ldcm1sUAAAAALDyu1f5Q60-fQbIDLrG5_i6F-ff",
      recaptcha: null,
      success: false,
      sending: false
    };
  },

  computed: {
    isDisabled() {
      const { inputs } = this;
      return Object.keys(inputs).some(key => !inputs[key].value) || !this.recaptcha
    },

    buttonClasses() {
      return [
        "button is-fullwidth is-medium is-info",
        { "is-loading": this.sending }
      ];
    }
  },

  methods: {
    createNewUser() {
      let { inputs } = this;
      let credentials = {};

      Object.keys(inputs).forEach(key => {
        credentials[key] = inputs[key].value;
      });

      if (!this.errors.any() && !this.isDisabled) {
        this.sending = true;
        this.$http
          .post("/users", {
            credentials,
            recaptcha: this.recaptcha
          })
          .then(res => {
            this.sending = false;
            this.success = true;
            this.reset();
          })
          .catch(e => {
            if (e.response) {
              const message = `[${e.response.status}]:${
                e.response.data.message
              }`;
              const options = {
                theme: "primary",
                duration: 5000,
                icon: "exclamation-triangle",
                className: ["bis-notification", "danger"]
              };
              this.$toasted.show(message, options);
              Object.keys(e.response).forEach(err =>
                console.log(e.response[err])
              );
            }
            this.sending = false;
            this.$refs.recaptcha.reset();
          });
      }
    },

    onVerify(val) {
      this.recaptcha = val;
    },

    onExpire() {
      this.recaptcha = null;
      this.$refs.recaptcha.reset();
    },

    reset() {
      this.clearForm();
      this.$refs.recaptcha.reset();
      this.recaptcha = null;
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
.recaptcha {
  display: flex;
  justify-content: center;
}
</style>
