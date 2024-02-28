// @vitest-environment nuxt
import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, beforeEach } from 'vitest';
import { usePalaceStore } from '../palace';

describe('Store > palace', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('exposes public API correctly', () => {
    const palace = usePalaceStore();

    expect(palace.sheet).toMatchSnapshot();
    expect(palace.form).toMatchSnapshot();
    expect(palace.setAnswer).toBeTypeOf('function');
    expect(palace.getEntityById).toBeTypeOf('function');
  });

  describe('#getEntityById', () => {
    it('returns the entity', () => {
      const palace = usePalaceStore();
      expect(palace.getEntityById('attribute.for')).toMatchSnapshot();
    });
  });

  describe('setAnswer method=manual', () => {
    beforeEach(() => {
      const palace = usePalaceStore();
      palace.setAnswer({ entityId: '/aspect.attributes/', index: 0 }, 'manual');
    });

    it('changes the value of form', () => {
      const palace = usePalaceStore();
      expect(palace.form).toMatchSnapshot();
    });

    describe('setAnswer attributes=obj', () => {
      beforeEach(() => {
        const palace = usePalaceStore();
        const attributeObject = JSON.parse(JSON.stringify(
          palace.form['/aspect.attributes/'].fields[1].attributes,
        )) as Record<string, any>;

        // assign index to each attribute
        Object.keys(attributeObject).forEach((key, index) => {
          attributeObject[key] = index;
        });

        palace.setAnswer({ entityId: '/aspect.attributes/', index: 1 }, attributeObject);
      });

      it('changes the value of sheet', () => {
        const palace = usePalaceStore();
        expect(palace.sheet).toMatchSnapshot();
      });
    });
  });
});
