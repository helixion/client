<template>
<div class="field">
    <div class="control has-icons-right">
        <label for="">{{name}}</label>
        <input :class="inputClasses" :type="password? 'password' : 'text'"
            v-validate="{
            email,
            required,
            regex,
            numeric,
            alpha,
            alpha_num: alphaNum,
            alpha_dash: alphaDash,
            alpha_spaces: alphaSpaces,
            between,
            min,
            max,
            confirmed
            }" 
            :name="id" 
            :id="id"
            :disabled="disable"
            required="required" 
            :value="value"
            @input="$emit('input', $event.target.value)">
            <span class="icon is-small is-right" v-if="!value || errors.has(id)">
                <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
            </span>
            <span class="icon is-small is-right" v-else>
                <i class="fa fa-check" aria-hidden="true"></i>
            </span>
            
    </div>
    <p class="error" v-show="errors.has(id)">{{errors.first(id)}}</p>
    <slot></slot>
</div>  
</template>

<script>

export default {
  name: 'modal-input',
  inject: ['$validator'],
  props: {
    name: {
      type: String,
      required: true
    },
    required: {
      type: Boolean,
      default: false
    },
    regex: {
      type: RegExp
    },
    numeric: {
      type: Boolean,
      default: false
    },
    alpha: {
      type: Boolean,
      default: false
    },
    alphaNum: {
      type: Boolean,
      default: false
    },
    alphaDash: {
      type: Boolean,
      default: false
    },
    alphaSpaces: {
      type: Boolean,
      default: false
    },
    email: {
      type: Boolean,
      default: false
    },
    between: {
      type: [Array, Boolean],
      default: false
    },
    min: {
      type: [Number, Boolean],
      default: false
    },
    max: {
      type: [Number, Boolean],
      default: false
    },
    confirmed: {
      type: [String, Boolean],
      default: false
    },
    
    password: Boolean,
    disable: Boolean,
    id: String,
    value: String
    
  },

  computed: {
      inputClasses() {
          return ['input', { 'is-success': !this.errors.has(this.id) || this.value !== '', 'is-danger': this.errors.has(this.id) || !this.value }];
      }
  }


};
</script>


<style lang="scss">
.bis-modal {
  .error {
  font-size: 12px;
  position: absolute;
  color: #cacaca;
}

.control {
  position: relative;
  label {
    position: absolute;
    pointer-events: none;
    color: #cacaca;
    background-color: #333;
    font-size: 9pt;
    top: -9px;
    left: 5px;
    z-index: 1000;
    font-weight: bold;
    padding: 0 0.3125rem;
  }
  .input {
    background-color: #333;
    border: 2px solid #555;
    color: #cacaca;
    box-shadow: 1px 1px 0 rgba(55, 55, 55, 0.5); // padding: 1px 5px 0;
    padding-left: 0.55rem;
    &:focus {
      outline: none;
    }
  }
}
}
</style>


