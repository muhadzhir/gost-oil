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
  const props = defineProps<{
    fieldName: string
    inputValue: string | number | undefined
    limit?: number
    mask?: 'number' | 'phone'
  }>()
  const emits = defineEmits<{
    (e: 'updateField', val: string | number): void
  }>()
  const getValueWithMask = (val: string) => {
    if (props.mask === 'number') {
      let value = parseInt(val)
      if (value < 0) return 0
      if (props.limit) return value > props.limit ? props.limit : value
      return value
    }
    return ''
  }
  const handlerInput = (val: string) => {
    let inputValue: string | number = val
    if (val && props.mask) {
      inputValue = getValueWithMask(val)
    }
    emits('updateField', inputValue)
  }
</script>
<style lang="scss">
  .input {
    height: 45px;
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