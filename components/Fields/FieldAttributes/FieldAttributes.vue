<script setup lang="ts">
const props = withDefaults(defineProps<{
  type: 'attributes',
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
  default?: Record<string, number>
  /** a text explaining or describing the current field that is visible to the user, this accept markdown */
  description?: string
  /**
   * the method of selection for the attributes
   * @default 'points'
   */
  method?: 'points' | 'roll' | 'manual'
  /**
   * defines what attributes exits their label and the entity id behind it.
   * The Value is the label to be displayed to the user, and the Key is the
   * entity id that maps to the attribute.
   * @example
   * {
   *   'attribute.for': 'Força',
   *   'attribute.des': 'Destreza',
   *   'attribute.con': 'Constituição',
   *   'attribute.int': 'Inteligência',
   *   'attribute.sab': 'Sabedoria',
   *   'attribute.car': 'Carisma',
   * }
   */
  attributes: Record<string, string>
  /**
   * a roll20 compliant string describing a roll that returns *one* value to be used to generate one attribute
   *
   * @link https://help.roll20.net/hc/en-us/articles/360037773133-Dice-Reference
   * @link https://wiki.roll20.net/Dice_Reference
   */
  rolling?: string
  /** a set of rules for the buying points method */
  points?: {
    /** a label for the name of the point */
    label: string
    /** the starting value for the points */
    starting: number
    /** the minimum value acceptable for an attribute */
    minValue: number
    /** the maximum value acceptable for an attribute */
    maxValue: number
    /**
     * mapping the cost of each point, considering Record<K, V>: K is the value
     * on the attribute, and V is cost in points for that values
     *
     * @example
     * {
     *   '-1': -1,
     *    '0':  0,
     *    '1':  1,
     *    '2':  2,
     *    '3':  4,
     *    '4':  7,
     * }
     */
    cost: Record<string, number>
  }
}>(), {
  method: 'points',
  default: undefined,
  description: undefined,
  placeholder: undefined,
  points: undefined,
  rolling: undefined,
});

const formValueFormat = computed(() => {
  return props.default ?? Object.fromEntries(
    Object.keys(props.attributes)
      .map(key => [key, undefined]),
  );
});

const { formValue } = useFormValue(props.entityId, props.index, formValueFormat);

watch(formValueFormat, (value) => {
  formValue.value = value;
});

watch(() => props.method, (method) => {
  // reset numbers after method change to avoid conflicts
  Object.keys(formValue.value).forEach((key) => {
    formValue.value[key] = (method === 'points') ? 0 : undefined;
  });
}, { immediate: true });
</script>

<template>
  <FieldAttributesManual
    v-if="props.method === 'manual'"
    v-model:formValue="formValue"
    :attributes="props.attributes"
  />
  <FieldAttributesPoints
    v-else-if="props.method === 'points'"
    v-model:formValue="formValue"
    :attributes="props.attributes"
    :points="props.points"
  />
  <FieldAttributesRoll
    v-else-if="props.method === 'roll'"
    v-model:formValue="formValue"
    :attributes="props.attributes"
    :rolling="props.rolling"
    :form-value-format="formValueFormat"
  />
</template>
