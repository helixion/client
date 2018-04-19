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
          default: ''
      },
      classes: {
          type: Object,
          default() {
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

  mounted() {
    //   this.height = `${this.$refs.accordion.scrollHeight}px`;
  },

  data() {
      return {
          transition: '',
          height: ''
      }
  },

  methods: {
      toggleTransition() {
        //   const height = this.$refs.accordion.scrollHeight;
          this.transition = `height ${this.transitionDuration}ms ${this.timingFunction}`;
          this.height = this.height? '' : `${this.height}px`;
          const timeout = setTimeout(() => {
              this.$nextTick(() => {
                  this.transition = '';
                  clearTimeout(timeout);
              })
          }, this.transitionDuration);
      }
  },

  render(h) {
      return h(this.parentTag, {
          attrs: {
              classes: this.classes,
              id: this.id,
          },
          on: {
              click: this.toggleTransition
          }
      },
      //child of this.parentTag
      h('div', { 
          attrs: {
              classes: {
                  'accordion-head': true
              }
          }
      },
      //children of div.accordion-head 
      h('a', this.$slots.name),

      h('button', {
          attrs: {
              classes: {
                  toggle: true
              }
          }
      },
      //child of button.toggle 
      h('i', {
          attrs: {
              classes: {
                  [this.toggleActiveClass]: this.height,
                  [this.toggleInactiveClass]: !this.height
              }
          }
      }))
      ),
      //child of this.parentTag
      h(this.childTag, {
          attrs: {
              classes: {
                  'accordion-body': true
              },
              styles: {
                  height: this.height,
                  transition: this.transition
              }
          },
          ref: 'accordion'
      }, this.$slots.default)
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
        a {
            flex: 1;
        }
        .toggle {
            border: none;
            background: transparent;
            &:focus {
                outline: none;
            }
        }
    }
    .accordion-body {
        height: 0;
    }
}
</style>
