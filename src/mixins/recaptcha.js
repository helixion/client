import VueRecaptcha from "vue-recaptcha";
export default {
  components: { VueRecaptcha },
  computed: {
    site_key() {
        return this.$store.getters.siteKey;
    }
  },
  methods: {
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
    }
  }
};
