<template>
    <form>
      
      <fieldset :class="{ 'disabled': sending }" :disabled="sending">

      <app-input 
      :name="'Email Address *'" 
      :email="true" 
      :required="true" 
      :id="'email'" 
      v-model="credentials.email"></app-input>

      <app-input 
        :name="'Full Name *'" 
        :required="true" 
        :alphaSpaces="true"
        :id="'name'" 
        v-model="credentials.fullname"></app-input>

      <app-input 
        :name="'Username *'" 
        :id="'username'" 
        :alphaSpaces="true" 
        :required="true" 
        v-model="credentials.username"></app-input>

      <app-input 
        :password="true" 
        :name="'Password *'" 
        :id="'password'"
        :required="true" 
        :alphaNum="true"
        :min="8" 
        :max="20" 
        v-model="credentials.password"></app-input>

      <!-- <app-input 
        :password="true" 
        :name="'Re-type Password *'"
        :id="'confirm'" 
        :required="true"
        :alphaNum="true"
        v-model="credentials.passwordConfirm"></app-input> -->

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
</template>

<script>
import Input from "./inputs/ModalInput";
export default {
  components: {
    appInput: Input
  },

  $_veeValidate: {
    validator: "new"
  },

  data() {
    return {
      credentials: {
        email: "",
        username: "",
        fullname: "",
        password: ""
      },
      sending: false
    };
  },

  computed: {
    isDisabled() {
      const {
        email,
        username,
        fullname,
        password
      } = this.credentials;

      return !email || !username || !fullname || !password;
    },

    buttonClasses() {
      return ['button is-fullwidth is-medium is-info', { 'is-loading': this.sending}];
    }
  },

  methods: {
    createNewUser() {
      const { credentials } = this.$data;

      if (!this.errors.any() && !this.isDisabled) {
        this.sending = true;
        this.$http
          .post("/users", {
            credentials
          })
          .then(res => {
            this.sending = false;
            this.$notify({
              group: 'notes',
              type: 'success',
              title: "Thank you for registering.",
              text: "An activation email has been dispatched, please activate.",
              duration: 3000
            })
            this.clearForm();
          })
          .catch(e => {
            this.sending = false;
            // this.$notify({
            //   group: 'notes',
            //   type: 'danger',
            //   title: "User already exists.",
            //   text: "Apparently the user already exists. Please try again.",
            //   duration: 3000
            // })
            Object.keys(e.response)
              .forEach(err => console.log(e.response[err]));
          });
      }
    },

    clearForm() {
     const { credentials } = this.$data;
     for (let key in credentials) {
       credentials[key] = '';
     }
    }
  }
};
</script>
