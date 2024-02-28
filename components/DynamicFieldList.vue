<script setup lang="ts">
const props = defineProps<{
  fields: {
    if: boolean;
    label: string;
    type: string;
  }[];
  entityId: string;
}>();
</script>

<template>
  <div class="dynamic-field-list">
    <div
      v-for="({ if: ifValue, ...field }, index) in props.fields"
      :key="`${field.label}:${field.type}:${index}`"
    >
      <DynamicField
        v-if="ifValue ?? true"
        v-bind="field"
        :entity-id="props.entityId"
        :index="index"
      />
    </div>
  </div>
</template>

<style lang="scss">
.dynamic-field-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-0200);
}
</style>
