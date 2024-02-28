import { createPalace } from '@any-percent/engine';
import { get } from '@vhoyer/utils/dist/object';
import { diff } from 'deep-diff';
import Tormenta20 from '~/assets/bundles/tormenta-20/index.js?raw';

const palace = createPalace([Tormenta20]);

type FormLocator = { entityId: string; index: number; };

export const usePalaceStore = defineStore('palace', () => {
  const answers = ref({} as Record<string, any[]>);

  function setAnswer({ entityId, index }: FormLocator, value: any) {
    answers.value[entityId] ||= [];
    answers.value[entityId][index] = value;
  }

  const builder = ref({
    sheet: {},
    form: {},
  } as ReturnType<typeof palace.builder.createSheet>);

  const newBuilder = ref({
    sheet: {},
    form: {},
  } as ReturnType<typeof palace.builder.createSheet>);

  watch(answers, () => {
    newBuilder.value = palace.builder.createSheet(answers.value);
  }, { deep: true });

  const builderDiff = computed(() => diff(builder.value, newBuilder.value) ?? []);

  watch(builderDiff, () => {
    for (const diffItem of builderDiff.value ?? []) {
      const path: string[] = diffItem.path ?? [];

      let NECK: any = null;
      let HEAD: any = builder.value;
      const headName: string = path.at(-1) ?? '';

      // select the HEAD of the object
      for (const part of path) {
        NECK = HEAD;
        HEAD = HEAD[part];
      }

      // get the new value
      const newValue = get(newBuilder.value, path);
      // apply to reactive object
      NECK[headName] = newValue;
    }
  }, { immediate: true });

  const sheet = computed(() => builder.value.sheet);
  const form = computed(() => builder.value.form);

  return {
    // private
    _answers: answers,
    _builder: builder,
    _newBuilder: newBuilder,
    _builderDiff: builderDiff,

    // public
    sheet,
    form,
    setAnswer,
    getEntityById: (idRaw: MaybeRefOrGetter<string>) => {
      const id = toValue(idRaw)
        .replace(/^\//g, '')
        .replace(/\/$/g, '')
        .split('/')
        .at(-1) ?? '';
      return palace.getEntityById(id);
    },
  };
});
