<template>
  <div class="columns is-multlined">
      <div class="column">
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
                        <button class="button is-primary is-fullwidth" @click.prevent="changePassword">Submit</button>
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
    </div>
</template>

<script>
'use strict';
import FormInput from './inputs/HorizontalFormInput';
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
        try {
          const res = await this.$http
            .post('/users/edit-password', data);

          if (res.status >= 200 && res.status < 400) {
            this.$notify({
                    group: 'notes',
                    type: 'success',
                    text: 'An email has been dispatched.'
                });
            this.$emit('update:sending', false);
          }
        }
        catch (e) {
          if (e.response && e.response.status === 409) {
            this.$notify({
                group: 'notes',
                type: 'error',
                text: `${e.response.status}:${e.response.data.message}`
              });
              this.$emit('update:sending', false);
          } else {
            console.log(e);
          }
        }

      }
  }
}
</script>
