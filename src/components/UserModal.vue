<template>
<transition mode="out-in" name="fade">
  <div id="modal-overlay" @click="setModal(false)" v-show="showModal">
      <div :id="formType" class="bis-modal" @click.stop>
          <div class="bis-modal-head">
              <ul v-if="selected !== 'app-password-recovery'">
                  <li :class="{ 'tab-active': selected === 'app-register'}" @click.prevent="selected = 'app-register'">Register</li>
                  <li :class="{ 'tab-active': selected === 'app-login'}" @click.prevent="selected = 'app-login'">Sign In</li>
              </ul>
              <ul v-else>
                  <li class="tab-active">Password Recovery</li>
              </ul>
              <span class="delete" @click="setModal(false)"></span>
          </div>
          <div class="bis-modal-body">
              <div class="bis-icon">
                  <img src="http://localhost/images/bis-logo-sm.png" alt="">
              </div>
              <keep-alive>
                  <component :is="selected" @setForm="selected = $event"></component>
              </keep-alive>
          </div>
          <div class="bis-modal-foot">
              <span>Forgot a password? Click here.</span>
          </div>
      </div>
  </div>
</transition>
</template>

<script>
import Register from '@/components/forms/Register';
import Login from '@/components/forms/Login';
import ForgotPassword from '@/components/forms/ForgotPassword';

export default {
  components: {
      appRegister: Register,
      appLogin: Login,
      appPasswordRecovery: ForgotPassword
  },

  data() {
      return {
          selected: 'app-login'
      }
  },

  computed: {
      showModal() {
          return this.$store.getters.modal;
      },
      formType() {
          return this.selected.slice(
              this.selected.indexOf('-')+1, 
              this.selected.length
            );
      }
  },

  methods: {
      setModal(bool) {
          this.$store.dispatch('setModal', bool);
      }
  }
}
</script>


<style lang="scss">
$bis-overlay-background: rgba(22,22,22,0.9);
$bis-modal-body-background: #333;
$bis-modal-tab-active: #222;
$bis-modal-footer-background: #222;
$bis-primary-font-color: #cacaca;

#modal-overlay {
    background-color: $bis-overlay-background;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 1000;
    #login {
        max-height: 30rem;
       
    }
    #register {
        max-height: 40rem;
    }
    #password-recovery {
        max-height: 20rem;
    }
    #login, 
    #register, 
    #password-recovery {
        height: auto !important;
    }
    .bis-modal {
        background: $bis-modal-body-background;
        display: flex;
        flex-direction: column;
        position: absolute;
        border: 1px solid #555;
        max-width: 31.31rem;
        width: auto;
        top: 100px;
        left: 0;
        right: 0;
        bottom: 0;
        margin: 0 auto;
        box-shadow: 1px 1px 3px rgba(0,0,0,0.5);
        .delete {
            position: absolute;
            top: 5px;
            right: 5px;
        }
        .bis-modal-head > ul {
            list-style-type: none;
            padding: 0;
            margin: 0;
            display: flex;
            justify-content: space-between;
            li {
                text-align: center;
                font-weight: 700;
                color: $bis-primary-font-color;
                padding: 1.25rem;
                flex: 1 1 50%;
                &.tab-active {
                    background-color: $bis-modal-tab-active;
                }
            }
        }
        .bis-modal-body {
            flex: 1;
            display: flex;
            flex-direction: column;
            padding: 5px 20px;
            .bis-icon {
                display: flex;
                justify-content: center;
                margin:  0.625rem 0;
                img {
                    width: 60px;
                    height: 60px;
                }
            }
            .field {
                margin-bottom: 1.875rem;
            }
            button:not(:last-child) {
                margin-right: 0.3125rem;
            }
        }
        .bis-modal-foot {
            color: $bis-primary-font-color;
            background-color: $bis-modal-footer-background;
            margin-top: 0.625rem;
            padding: 20px;
        }
        
    }
}

@media only screen and (max-width: 320px) {
    #modal-overlay {
        .bis-modal-head {
            ul {
                flex-direction: column;
                li {
                    flex-basis: 100%;
                }
            }
        }
        .bis-modal-body {
            .bis-icon {
                visibility: hidden;
            }
        }
    }
}

.fade-enter-active, .fade-leave-active {
    transition: opacity .25s;
}

.fade-enter, .fade-leave-to {
    opacity: 0;
}

</style>

