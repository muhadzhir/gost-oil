<template>
  <el-form-item
      v-bind="$attrs"
      :prop="fieldName"
  >
    <MaskInput
        v-if="mask"
        v-model="value"
        v-bind="$attrs"
        class="input"
        :mask="mask"
        @keyup="($event: any) => handlerInput(`${$event!.target!.value!}`)"
    />
    <ElInput
        v-if="!mask"
      :model-value="value"
      v-bind="$attrs"
      class="input"
      @input="handlerInput"
    />
  </el-form-item>
</template>

<script lang="ts" setup>

  import {toRef} from "vue";

  const props = defineProps<{
    fieldName: string
    inputValue: string | number | undefined
    limit?: number
    mask?:  string
  }>()
  const emits = defineEmits<{
    (e: 'updateField', val: string | number): void
  }>()
  const value = toRef(props.inputValue)

  const handlerInput = (val: string) => {
    let inputValue: string = val
    emits('updateField', inputValue)
  }
</script>
<style lang="scss">
  .input {
    width: 100%;
    font-size: 40px;
    outline: none;
    padding: 0px 20px;
    height: 50px;
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