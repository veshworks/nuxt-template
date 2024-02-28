<script setup lang="ts">
const props = defineProps<{
  attributes: Record<string, string>
  formValue: Record<string, number | undefined>;
}>();

const emit = defineEmits<(e: 'update:formValue', value: Record<string, number | undefined>) => void>();

const formValue = computed({
  get: () => props.formValue,
  set: (value: Record<string, number | undefined>) => {
    emit('update:formValue', value);
  },
});
</script>

<template>
  <div class="columns columns-small text-center">
    <label
      v-for="(display, id) in props.attributes"
      :key="id"
      :for="`attribute-${id}`"
    >
      <p>{{ display }}</p>

      <input
        :id="`attribute-${id}`"
        v-model="formValue[id]"
        :class="{ 'warning-glow': formValue[id] === undefined }"
        type="number"
      >
    </label>
  </div>
</template>
