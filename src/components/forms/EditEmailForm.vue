<template>
  <div class="columns is-multlined">
      <div class="column">
        <section id="edit-password">
          <div class="section-head">
            <h4 class="title is-4">Edit Email</h4>
          </div>
          <div class="section-body">
            <form action="">
              <fieldset :class="{ 'is-disabled': sending }" :disabled="sending">
                <div class="field is-horizontal" v-for="(input, key) in credentials" :key="key">
                  <div class="field-label is-normal">
                    <label for="" class="label">{{key.charAt(0).toUpperCase() + key.slice(1)}}</label>
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <input :type="inputTypes[key]" class="input" v-model="credentials[key]">
                    </div>
                  </div>
                </div>
                <div class="field is-horizontal">
                  <div class="field-body">
                    <div class="field is-grouped is-grouped-centered">
                      <div class="control is-expanded">
                        <button class="button is-primary is-fullwidth" @click.prevent="changeEmail">Submit</button>
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
    </div>
</template>

<script>
export default {
  props: {
    sending: {
      type: Boolean,
      required: true
    }
  },

  data() {
      return {
          credentials: {
              password: '',
              email: '',
          },
          inputTypes: {
            password: 'password',
            email: 'text'
          }
      }
  },

  methods: {

      clearForm() {
        const credentials = this.credentials;
        for (let key in credentials) {
          credentials[key] = '';
        }
      },
      
      changeEmail() {
          const { 
            password, 
            email 
        } = this.credentials;
        this.$emit('update:sending', true);
        this.$http
            .post('/users/edit-password', { password, email })
            .then(res => {
                this.$notify({
                    group: 'notes',
                    type: 'success',
                    text: 'An email has been dispatched.'
                });
                this.$emit('update:sending', false);
                this.clearForm();
            })
            .catch(e => {
              this.$notity({
                group: 'notes',
                type: 'error',
                text: `${e.response.status}:${e.response.data.message}`
              });
              this.$emit('update:sending', false);
            })

      }
  }
}
</script>
