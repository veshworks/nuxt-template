<script setup lang="ts">
const props = defineProps<{
  attributes: Record<string, string>;
  rolling?: string;
  formValue: Record<string, number | undefined>;
  formValueFormat: Record<string, number | undefined>;
}>();

const emit = defineEmits<(e: 'update:formValue', value: Record<string, number | undefined>) => void>();

const formValue = computed({
  get: () => props.formValue,
  set: (value: Record<string, number | undefined>) => {
    emit('update:formValue', value);
  },
});

const rollingSelected = ref(Object.keys(props.attributes)
  .map(() => ''));

const rollValues = () => {
  return Object.keys(props.attributes)
    .map(() => (props.rolling, Math.floor(Math.random() * 7) - 2));
};

// TODO: replace with a real roll
const rolledValues = ref(rollValues());

const rollingOptions = computed(() => {
  if (props.rolling === undefined) return;
  const attrList = Object.keys(props.attributes);

  const entries = attrList.map((_, i) => {
    return {
      roll: rolledValues.value[i],
      chooseFrom: [
        ['', 'choose'],
        ...Object.entries(props.attributes)
          .filter(([key]) => !rollingSelected.value.includes(key) || key === rollingSelected.value[i]),
          // filter if already selected in other rolls, or it's the current one
      ],
    };
  });

  return entries;
});

watch([rollingSelected, rolledValues], ([selected, rolled]) => {
  const base = structuredClone(props.formValueFormat);

  selected.forEach((key, i) => {
    if (key === '') return;
    base[key] = rolled[i];
  });

  formValue.value = base;
}, { deep: true });
</script>

<template>
  <div class="roll-container">
    <button
      class="reroll-button"
      @click="rolledValues = rollValues()"
    >
      re-roll
    </button>

    <div class="columns columns-small text-center">
      <div
        v-for="(value, i) in rollingOptions"
        :key="i"
      >
        <p class="title-1">
          {{ value.roll }}
        </p>

        <label :for="`attribute-${i}`">
          <p>Link with</p>

          <select
            :id="`attribute-${i}`"
            v-model="rollingSelected[i]"
            :class="{ 'warning-glow': !rollingSelected[i] }"
          >
            <option
              v-for="([key, display]) in value.chooseFrom"
              :key="key"
              :value="key"
              :selected="false"
            >
              {{ display }}
            </option>
          </select>
        </label>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.roll-container {
  align-items: end;
  display: grid;
  gap: var(--space-0300);
  grid-template-columns: 1fr;

  @media (width >= 800px) {
    grid-template-columns: auto 1fr;
  }
}

.reroll-button {
  @media (width < 450px) {
    grid-column-end: span 2;
  }
}
</style>
