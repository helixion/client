<template>
  <div id="editor"></div>
</template>

<script>
import { init, exec } from "pell";
import actions from './actions';
import dompurify from "dompurify";
export default {
  props: {
    value: {
      type: String,
      required: true
    },
    id: {
      type: String,
      default: "editor"
    },
    defaultParagraphSeparator: {
      type: String,
      default: "p"
    },
    styleWithCss: {
      type: Boolean,
      default: false
    },
    actions: {
      type: Array,
      default: () => [
        "bold",
        "italic",
        "underline",
        "heading1",
        "heading2",
        "code",
        "link",
        "image"
      ]
    },
    classes: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      editor: null
    };
  },
  mounted() {
    if (this.$el) {
      const element = document.getElementById(this.id);
      const {
        defaultParagraphSeparator,
        styleWithCss,
        actions,
        classes
      } = this;
      let opts = {
        element,
        defaultParagraphSeparator,
        styleWithCss,
        onChange: html => {
          let h;

          const sanitized = dompurify.sanitize(html, {
            SAFE_FOR_TEMPLATES: true,
            FORBID_TAGS: ["style"],
            FORBID_ATTR: ["style"],
            ALLOW_DATA_ATTR: false,
            KEEP_CONTENT: false,
            html: true
          });
          if (sanitized === "<p><br></p>") {
            h = "";
          } else {
            h = sanitized;
          }
          this.$emit("input", h);
          this.$emit("change", { editor: this.editor, html: h });
        }
      };
      if (actions.length) {
        opts.actions = actions;
      }
      if (typeof classes === "object" && Object.keys(classes).length) {
        opts.classes = classes;
      }
      this.editor = init(opts);
      if (this.editor) {
        this.value
          ? (this.editor.content.innerHTML = this.value)
          : (this.editor.content.innerHTML =
              "Feel free to use either markdown or html...");
      }
    }
  },
  beforeDestroy() {
    this.editor = null;
  }
};
</script>

<style lang="scss">
$pell-actionbar-color: #0a0a0a;
$pell-content-height: 100%;
#editor {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
}
.pell-content,
.pell-actionbar {
  text-align: left;
}
.pell-content {
  background-color: #1f1f1f;//#1f2226;
  color: #cacaca;
  flex: 1 1 100%;
  height: 100%;
  width: 100%;
  min-height: auto;
  overflow-y: auto;
  overflow-x: hidden;
  word-wrap: break-word;
}
.pell-actionbar {
  padding: 0.25rem;
  .pell-button {
    color: #f1f1f1;
  }
}
@import "../../../node_modules/pell/src/pell";
</style>
