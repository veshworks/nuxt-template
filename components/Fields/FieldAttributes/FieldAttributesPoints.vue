<script lang="ts" setup>
const props = defineProps<{
  points?: {
    label: string
    starting: number
    minValue: number
    maxValue: number
    cost: Record<string, number>
  };
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

const availablePoints = computed(() => {
  if (props.points === undefined) return 0;
  const { starting, cost } = props.points;

  return starting - (
    Object.values(formValue.value)
      .reduce((acc, value) => (acc as number) + cost[value ?? 0], 0)
    ?? 0 // this is here because typescript is stupid
  );
});

const pointsOptions = computed(() => {
  if (props.points === undefined) return;
  const { minValue, maxValue, cost } = props.points;
  const attrList = Object.keys(props.attributes);

  const entries = attrList.map(key => [
    key,
    /** range from minValue to maxValue (inclusive) */
    Array.from<number>({ length: Math.abs(minValue - maxValue) + 1 })
      .fill(minValue)
      .map((v, i) => v + i)
      .filter(v => (cost[v] <= availablePoints.value + cost[formValue.value[key] ?? '0'] || v <= (formValue.value[key] ?? 0))),
  ]);

  return Object.fromEntries(entries) as Record<string, number[]>;
});
</script>

<template>
  <p class="text-center title-2 mb-0200">
    <span class="title-casing">{{ props.points?.label }}</span>:
    {{ availablePoints }}
  </p>

  <div class="columns columns-small text-center">
    <label
      v-for="(display, id) in props.attributes"
      :key="id"
      :for="`attribute-${id}`"
    >
      <p>{{ display }}</p>

      <select
        :id="`attribute-${id}`"
        v-model="formValue[id]"
        :class="{ 'warning-glow': availablePoints !== 0 }"
      >
        <option
          v-for="value in pointsOptions?.[id]"
          :key="String(value)"
          :value="value"
          :selected="formValue[id] === value"
        >
          {{ value }} ({{ props.points?.cost[value] }} {{ props.points?.label }})
        </option>
      </select>
    </label>
  </div>
</template>
