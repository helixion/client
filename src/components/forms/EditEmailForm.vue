<template>
<div class="column is-12">
  <section id="edit-password">
    <div class="section-head">
      <h4 class="title is-4">Edit Email</h4>
    </div>
    <div class="section-body">
      <form action="">
        <fieldset :class="{ 'is-disabled': sending }" :disabled="sending">
          <form-input v-for="(input, key) in credentials" :key="key" 
          v-model="input.value" 
          :label="input.label" 
          :inputType="input.type"
          :id="input.id" 
          :validators="input.validators">
          </form-input>
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
import FormInput from "./inputs/HorizontalFormInput";
export default {
  name: "edit-email-form",
  components: { FormInput },
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
          value: "",
          label: "password",
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
          value: "",
          label: "email",
          id: "edit-email",
          type: "text",
          validators: {
            required: true,
            email: true
          }
        }
      }
    };
  },
  computed: {
    isDisabled() {
     return Object.keys(this.credentials).some(key => !this.credentials[key]);
    }
  },
  methods: {
    clearForm() {
      const credentials = this.credentials;
      for (let key in credentials) {
        credentials[key].value = "";
      }
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
