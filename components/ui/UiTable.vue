<script setup lang="ts">
type HeadDef = { text: string; align: 'start' | 'center' | 'end' };
const props = defineProps<{
  title?: string;
  headers?: (string | HeadDef)[];
  items?: string[][];
}>();

const headers = computed(() => {
  return (
    props.headers?.map((item) => {
      if (typeof item === 'string') {
        return {
          text: item,
          align: 'center',
        } as HeadDef;
      }

      return item;
    }) ?? []
  );
});
</script>

<template>
  <table
    class="ui-table"
    cellspacing="0"
    cellpadding="0"
  >
    <caption v-if="title">
      {{
        title
      }}
    </caption>
    <thead>
      <tr>
        <th
          v-for="head in headers"
          :key="head.text"
          :style="{ 'text-align': head.align }"
        >
          {{ head.text }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="row in items"
        :key="row.join()"
      >
        <td
          v-for="(cell, column) in row"
          :key="cell"
          :style="{ 'text-align': headers[column].align }"
        >
          {{ cell }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss">
.ui-table {
  font-family: var(--font-family-sans);

  & > caption {
    color: var(--color-red-deep);
    font-family: var(--font-family-attention);
    font-size: var(--font-size-300);
  }

  /* heading and cell */
  & > thead > tr > th,
  & > tbody > tr > td {
    padding-left: var(--space-0100);
    padding-right: var(--space-0100);
  }

  & > thead > tr,
  & > tbody > tr:nth-child(2n) {
    background-color: var(--color-beige-deep);
  }

  /* heading */
  & > thead > tr > th {
    font-family: var(--font-family-attention);
    font-size: var(--font-attention-size);
    text-align: start;
    vertical-align: bottom;
  }

  /* cell */
  & > tbody > tr > td {
    text-align: center;
  }
}
</style>
