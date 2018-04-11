<template>

  <section id="manage-post">
      <div class="container">
          <h1 class="title">Manage Post</h1>
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
  </section>
</template>

<script>
import TextEditor from '@/components/text-editor/TextEditor';
export default {
  name: 'manage-post',
  components: { TextEditor },
  data() {
      return {
          content: 'Insert your content here....',
          sending: false
      }
  }
}
</script>

<style lang="scss">
#text-editor {
    min-height: 20rem //320px
}

#manage-post {
    input {
        background-color: #0b0b0b;
        border: none;
        box-shadow: 1px 1px 2px rgba(0,0,0,0.7);
        color: #cacaca;
        &::placeholder {
            color: inherit;
        }
    }
}
</style>

