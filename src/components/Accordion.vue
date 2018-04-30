<script>
export default {
  props: {

    parentTag: {
      type: String,
      default: 'div'
    },
    childTag: {
      type: String,
      default: 'div'
    },
    id: {
      type: String,
      default: null
    },
    classes: {
      type: Object,
      default () {
        return {
          accordion: true,
          'navbar-item': true
        }
      }
    },
    toggleActiveClass: {
      type: String,
      default: 'fa fa-chevron-up'
    },
    toggleInactiveClass: {
      type: String,
      default: 'fa fa-chevron-down'
    },
    transitionDuration: {
      type: Number,
      default: 250
    },
    timingFunction: {
      type: String,
      default: 'ease'
    }
  },

  data() {
    return {
      height: '0px',
      show: false,
      timeout: null
    }
  },

  beforeDestroy() {
      this.timeout = null;
  },

  methods: {
    toggleTransition() {
      this.height = `${this.$refs.accordion.scrollHeight}px`;  
      if (!this.show) {
        this.show = true;
        // clearInterval(this.timeout);
        this.$nextTick(() => {
          this.timeout = setTimeout(() => {
            this.height = "";
          }, 250);
        });
      } else {
        this.show = false;
        clearInterval(this.timeout);
        this.$nextTick(() => {
          this.timeout = setTimeout(() => {
            this.height = "0px";
          }, 50);
        });
      }
    }


  },


  render(h) {
    return h(this.parentTag, {
        class: this.classes,
        attrs: {
          id: this.id,
        },
        on: {
          click: this.toggleTransition
        }
      },
      //child of this.parentTag
      [h('div', {
            class: {
              'accordion-head': true
            }
          },
          //children of div.accordion-head 
          [h('a', this.$slots.name),

            h('span', {
                class: {
                  toggle: true, 
                  [this.toggleActiveClass]: this.show, 
                  [this.toggleInactiveClass]: !this.show
                },
                attrs: {
                  role: 'button'
                }
              }
            )
          ]
        ),
        //child of this.parentTag
        h(this.childTag, {
          class: {
            'accordion-body': true,
            show: this.show
          },
          style: {
            height: this.height
          },
          ref: 'accordion'
        }, this.$slots.default)
      ]
    )
  }

} 
</script>



<style lang="scss">
.accordion {
    display: flex;
    flex-direction: column;
    .accordion-head {
        display: flex;
        align-items: center;
        a {
            flex: 1;
        }
        .toggle {
            display: inline-block;
            border: none;
            background: transparent;
            &:focus {
                outline: none;
            }
        }
    }
    .accordion-body {
        height: 0;
        overflow: hidden;
        &.show {
            height: auto;
        }
        transition: height 250ms ease;
    }
}
</style>
