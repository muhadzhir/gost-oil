<template>
  <el-form-item
      v-bind="$attrs"
      :prop="fieldName"
  >
  <ElInput
    :model-value="inputValue"
    v-bind="$attrs"
    class="input"
    @input="handlerInput"
  />
  </el-form-item>
</template>

<script lang="ts" setup>
  defineProps<{
    fieldName: string
    inputValue: string | number | undefined
  }>()
  const emits = defineEmits<{
    (e: 'updateField', val: string): void
  }>()
  const handlerInput = (val: string) => {
    emits('updateField', val)
  }
</script>
<style lang="scss">
  .input {
    height: 40px;
    border-radius: 10px;
    overflow: hidden;
    .el-input {
      &__wrapper, &__inner {
        height: 100%;
      }
      &__inner {
         width: 100%;
        padding: 10px;
      }
    }

  }
</style>