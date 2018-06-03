<template>
<div class="column is-12">
  <section id="edit-password">
    <div class="section-head">
      <h4 class="title is-4">Edit Email</h4>
    </div>
    <div class="section-body">
      <form class="bis" action="">
        <fieldset :class="{ 'is-disabled': sending }" :disabled="sending">
          <form-input v-for="(input, key) in credentials" :key="key" 
          v-model="input.value" 
          :label="input.label" 
          :inputType="input.type"
          :id="input.id" 
          :validators="input.validators">
          </form-input>
          <div class="field">
            <div class="control">
              <vue-recaptcha
                theme="dark"
                ref="recaptcha" 
                :sitekey="site_key" 
                @expired="onExpire" 
                @verify="onVerify"/>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-body">
              <div class="field is-grouped is-grouped-centered">
                <div class="control is-expanded">
                  <button class="button is-primary is-fullwidth" :disabled="isDisabled || errors.any()" @click.prevent="changeEmail">Submit</button>
                </div>
                <div class="control is-expanded">
                  <button class="button is-primary is-outlined is-fullwidth" @click.prevent="clearForm">Reset</button>
                </div>
              </div>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  </section>
</div>

</template>

<script>
"use strict";
import recaptcha from "@/mixins/recaptcha";
import FormInput from "./inputs/Input";
export default {
  name: "edit-email-form",
  components: { FormInput },
  mixins: [recaptcha],
  $_veeValidate: {
    validator: "new"
  },
  props: {
    sending: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      credentials: {
        password: {
          value: null,
          label: "PASSWORD *",
          id: "edit-email-password",
          type: "password",
          validators: {
            required: true,
            alpha_num: true,
            min: 8,
            max: 20
          }
        },
        email: {
          value: null,
          label: "NEW EMAIL ADDRESS *",
          id: "edit-email",
          type: "text",
          validators: {
            required: true,
            email: true
          }
        }
      },
      recaptcha: null
    };
  },
  computed: {
    isDisabled() {
      return Object.keys(this.credentials).some(key => !this.credentials[key]) || !this.recaptcha;
    },
    site_key() {
      return this.$store.getters.siteKey;
    }
  },
  methods: {
   
    clearForm() {
      Object.keys(this.credentials).forEach(key => {
        this.credentials[key] = "";
      })
    },

    async changeEmail() {
      const { password, email } = this.credentials;
      const data = {
        password: password.value,
        new_email: email.value
      };
      this.$emit("update:sending", true);
      if (!this.errors.any() || !this.isDisabled) {
        try {
          const options = {
            theme: "primary",
            duration: 5000,
            className: ["bis-notification", "success"]
          };
          const res = await this.$http.post("/users/update/email", data);
          if (res.status >= 200 && res.status < 400) {
            this.$toasted("We've dispatched an email to your address", options);
            this.$emit("update:sending", false);
            this.clearForm();
          }
        } catch (e) {
          if (e.response) {
            const errorStatus = e.response.status;
            const errorMsg = e.response.data.message;
            const options = {
              theme: "primary",
              duration: 5000,
              className: ["bis-notification", "danger"]
            };
            if (errorStatus >= 400 && errorStatus < 500) {
              this.$toasted(`[${errorStatus}]:${errorMsg}`, options);
            }
          } else {
            console.log(e);
          }
          this.$emit("update:sending", false);
        }
      }
    }
  }
};
</script>
