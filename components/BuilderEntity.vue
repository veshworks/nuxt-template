<script setup lang="ts">
const props = defineProps<{
  entityId: string;
}>();

const palace = usePalaceStore();
const formEntry = computed(() => palace.form[props.entityId]);

const display = computed(() => {
  return palace.getEntityById(props.entityId)?.meta ?? {
    title: props.entityId,
    description: 'missing descriptions',
    pools: ['entity'],
  };
});
</script>

<template>
  <div v-if="!formEntry">
    Error: Entity ({{ props.entityId }}) not found
  </div>
  <details v-else>
    <summary
      :class="{ 'warn': formEntry.status === 'warn' }"
    >
      <h2 class="title-4">
        {{ display.title }}
      </h2>
    </summary>

    <UiTextCollapse>
      <MarkdownRender :source="display.description" />
    </UiTextCollapse>

    <hr class="my-0200">

    <DynamicFieldList
      :fields="formEntry.fields"
      :entity-id="entityId"
    />
  </details>
</template>
