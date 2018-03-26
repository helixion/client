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
import Input from './inputs/ModalInput';

export default {
  components: { appInput: Input },

  $_veeValidate: {
      validator: 'new'
  },
  
  data() {
      return {
          email: '',
          password: '',
          sending: false
      }
  },

  computed: {
    isDisabled() {
      const { email, password } = this.$data;
      return !email || !password;
    },

    buttonClasses() {
      return ['button is-medium is-fullwidth is-info', { 'is-loading': this.sending}];
    }
  },

  methods: {
    authenticate() {
      const { email, password } = this.$data;
      this.sending = true;
      this.$store.dispatch('authenticate', { email, password })
        .then(() => {
          this.sending = false;
          this.$router.push('/myaccount');
          this.clearForm();
        })
        .catch(e => {
          if (e.response.status >= 400) {
            this.sending = false;
            this.$notify({
              group: 'notes',
              type: 'danger',
              text: `${e.response.status}`
            })
            console.log(e.response.data);
          }
        })
    },

    clearForm() {
      for (let key in this.$data) {
        if (typeof this.$data[key] === 'string') {
          this.$data[key] = '';
        }
      }
    }
  }

}
</script>


<style>
.forgotpwd {
  float: right;
  font-size: 12px;
}
</style>
