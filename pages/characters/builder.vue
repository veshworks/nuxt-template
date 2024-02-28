<script setup lang="ts">
definePageMeta({
  name: 'characters-builder',
});

const palace = usePalaceStore();
</script>

<template>
  <div>
    <h1>Character Builder</h1>

    <div class="rows">
      <BuilderEntity
        v-for="(key) in Object.keys(palace.form)"
        :key="key"
        :entity-id="key"
      />
    </div>
  </div>
</template>
