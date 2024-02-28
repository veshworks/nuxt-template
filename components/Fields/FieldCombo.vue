<script setup lang="ts">
const props = withDefaults(defineProps<{
  type: 'combo',
  /** the id of the entity that the field is attached to */
  entityId: string,
  /** the index of the field */
  index: number,
  /** exbibits a text to the user as a main text for that widget */
  label: string
  /** defines a text that is visible to the user if they haven't inserted anything yet */
  placeholder?: string
  /**
   * has access to the current state of the form to be able to set default
   * values if they exist in the controls.
   */
  default?: any
  /** a text explaining or describing the current field that is visible to the user, this accept markdown */
  description?: string
  /**
   * configures options for the widget, this is only used in widgets that
   * require options, like `select` or `radio`.
   */
  options: {
    /** the text displayed to the user */
    display: string
    /** the value used internally */
    value: string | number | boolean
  }[]
}>(), {
  default: '',
  placeholder: undefined,
  description: undefined,
});

const id = computed(() => `field-${props.label.replace(/\s/g, '-')}`);

const { formValue } = useFormValue(props.entityId, props.index, props.default);

const aria = computed(() => ({
  ...(!props.description ? {} : { ['aria-describedby']: `${id.value}-description` }),
}));
</script>

<template>
  <label :for="id">
    <p>{{ props.label }}</p>

    <select
      :id="id"
      v-model="formValue"
      :class="{ 'warning-glow': !formValue }"
      v-bind="aria"
    >
      <option
        v-if="props.placeholder"
        value=""
        disabled
        :selected="formValue === ''"
      >
        -- {{ props.placeholder }} --
      </option>
      <option
        v-for="({ value, display }) in props.options"
        :key="String(value)"
        :value="value"
        :selected="formValue === value"
      >
        {{ display }}
      </option>
    </select>
  </label>

  <MarkdownRender
    v-if="props.description"
    :id="`${id}-description`"
    :source="props.description"
  />
</template>
