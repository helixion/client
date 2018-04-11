<template>
  <div class="column is-12">
    <section id="edit-password">
      <div class="section-head">
        <h4 class="title is-4">Edit Password</h4>
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
                    <button class="button is-primary is-fullwidth" :disabled="errors.any()" @click.prevent="changePassword">Submit</button>
                  </div>
                  <div class="control is-expanded">
                    <button class="button is-primary is-outlined is-fullwidth">Reset</button>
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
  'use strict';
  import FormInput from './inputs/HorizontalFormInput';
  export default {
    name: 'edit-password-form',
    components: { FormInput },
    $_veeValidate: {
      validator: 'new'
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
          currentPassword: {
            value: '',
            label: 'current password',
            id: 'current-password',
            type: 'password',
            validators: {
              required: true,
              alpha_num: true,
              min: 8,
              max: 20
            }
          },
          newPassword: {
            value: '',
            label: 'new password',
            id: 'new-password',
            type: 'password',
            validators: {
              required: true,
              alpha_num: true,
              min: 8,
              max: 20
            }
          },
        }
      }
    },

    methods: {
      clearForm() {
        for (let key in this.credentials) {
          this.credentials[key].value = '';
        }
      },
      async changePassword() {
        const {
          currentPassword,
          newPassword
        } = this.credentials;
        const data = {
          currentPassword: currentPassword.value,
          newPassword: newPassword.value
        }
        this.$emit('update:sending', true);
        if (!this.errors.any()) {
          try {

            const res = await this.$http
              .post('/users/edit-password', data);

            if (res.status >= 200 && res.status < 400) {
              this.$notify({
                group: 'notes',
                type: 'success',
                text: 'An email has been dispatched.'
              });
              this.clearForm();
              this.$emit('update:sending', false);
            }
          } catch (e) {
            if (e.response) {
              const errorStatus = e.response.status;
              if (errorStatus >= 400 && errorStatus < 500) {
                this.$notify({
                  group: 'notes',
                  type: 'error',
                  text: `${e.response.status}:${e.response.data.message}`
                });
              }
            } else {
              console.log(e);
            }
            this.$emit('update:sending', false);
          }
        }

      }

    }
  }

</script>
