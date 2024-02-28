import { createPalace } from '@any-percent/engine';
import Tormenta20 from '~/assets/bundles/tormenta-20/index.js?raw';

export const useTraits = defineStore('traits', () => {
  const { sheet, form } = createPalace([
    Tormenta20,
  ]).builder.createSheet({
    '/races/': [
      'race.humano',
    ],
    '/aspect.gods/': [
      'gods.khalmyr',
    ],
  });

  // eslint-disable-next-line no-console
  console.log(sheet, form);

  function raceGetById(id: number) {
    return {
      id,
    };
  }

  return {
    raceList: [] as {
      title: string;
    }[],
    raceGetById,
  };
});
