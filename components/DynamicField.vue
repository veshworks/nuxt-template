<script setup lang="ts">
const props = defineProps<{
  /** The type of field to render. */
  type: string;
  /** The entity id responsible for the field. */
  entityId: string;
  /** The index of the field. */
  index: number;
}>();

const field = resolveComponent(`field-${props.type}`);
</script>

<template>
  <div
    v-if="typeof field === 'string'"
    class="dynamic-field-missing-field"
  >
    Missing field "{{ props.type }}", check to see if it really exists on the
    `~/components/Fields/` folder.
  </div>
  <component
    :is="field"
    v-else
    v-bind="props"
  />
</template>

<style lang="scss">
.dynamic-field-missing-field {
  background-color: var(--color-red-pure);
  color: var(--color-white-pale);
}
</style>
