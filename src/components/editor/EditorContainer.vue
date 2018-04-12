<template>
  <transition name="fade">
    <div class="editor-container" :style="{ height: y + 'px' }">
      <div id="resizer"  @mousedown.left="init"></div>
      <div class="e-column">
        <form>
          <fieldset :disabled="sending">
            <div class="field">
              <div class="control">
                <input type="text" class="input" placeholder="Enter a title...">
              </div>
            </div>
            <div class="field is-horizontal">
              <label for="" class="field-label">Featured?:</label>
              <div class="field-body">
                <div class="field is-narrow">
                  <div class="control">
                    <div class="select is-fullwidth">
                      <select>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <text-editor v-model="content"></text-editor>
              </div>
            </div>
            <div class="field is-grouped">
              <div class="control">
                <button class="button is-primary">Save</button>
              </div>
              <div class="control">
                <button class="button is-primary is-outlined">Save as Draft</button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
      <div class="e-column">
        <div class="content editor-preview" v-html="content"></div>
      </div>
    </div>

  </transition>
</template>


<script>
import TextEditor from './Editor';
export default {
  name: 'editor-container',
  components: { TextEditor },
  data() {
      return {
          startingPointY: 0,
          y: 600,
          showPreview: true,
          sending: false,
          content: 'Insert plain text or html here...'
      }
  },

  methods: {
      init(evt) {
          console.log('attaching event listeners.')
          this.startingPointY = evt.clientY;
          this.isDragging = true;
          window.addEventListener('mousemove', this.onMouseMove, false);
          window.addEventListener('mouseup', this.onMouseUp, false);

      },
      onMouseMove(evt) {
          if (this.isDragging) {
              this.y = this.y - (evt.clientY - this.startingPointY);
              console.log(this.y);
          }
      },
      onMouseUp() {
          console.log('removing event listeners');
          this.isDragging = false;
          window.removeEventListener('mousemove', this.onMouseMove, false);
          window.removeEventListener('mouseup', this.onMouseUp, false);
      }
  }
}
</script>


<style lang="scss" scoped>
.editor-container {
    display: flex;
    justify-content: space-between;
    background-color: #333;
    position: fixed;
    z-index: 100;
    padding: 1rem;
    width: 100%;
    max-width: 1475px;
    box-shadow: 1px 1px 2px rgba(0,0,0,0.7);
    margin-right: auto;
    margin-left: auto;
    right: 0;
    left: 0;
    bottom: 0;
    height: 600px;
    max-height: 1200px;    
    transition: height 250ms ease,
    background 250ms ease, 
    transform 250ms ease, 
    max-width 250ms ease;
    #resizer {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        background-color: #0b0b0b;
        height: 10px;
    }
    .field {
        margin-bottom: 1.5rem !important;
    }    
    .e-column {
        width: 100%;
        margin: 0 auto;
        flex-grow: 1;
        flex-shrink: 1;
        flex-basis: 100%;
        padding: 0 0.75rem;
    }
    .editor-preview {
        overflow-y: auto;
        width: 100%;
        
    }
}
</style>
