<template>
  <div :class="['modal', { 'is-active': modalType}]">
      <div class="modal-content">
          <div class="box">
            <div class="columns is-vcentered">
                <div class="column is-narrow">
                    <i class="fa fa-exclamation-triangle fa-3x"></i>
                </div>
                <div class="column">
                    Cancelling will close the editor and any progress will be lost.
                </div>
            </div>
            <div class="columns">
                <div class="column">
                    <div class="buttons">
                        <button class="button is-danger" @click="$emit('closeEditor')">Proceed</button>
                        <button class="button is-primary" @click="$emit('update:modalType', '')">Cancel</button>
                    </div>
                </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
 name: 'cancel-prompt',
 props: ['modalType']
}
</script>

<style lang="scss">
#editor-container {
    .box {
        background-color: #383b40;
    }
}
</style>

