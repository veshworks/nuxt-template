// @vitest-environment nuxt
import { describe, it, expect, afterEach } from 'vitest';
import UiTable from './UiTable.vue';
import { render, screen } from '@testing-library/vue';
import { lazylet } from '@vhoyer/lazy-let';

describe('ui components > ui-table', () => {
  const $0 = lazylet(afterEach, {
    props: () => ({}),
    wrapper: $ => render(UiTable, {
      props: $.props,
    }),
    screen: ($) => {
      $.wrapper;
      return screen;
    },
  });

  it('renders empty', () => {
    expect($0.wrapper.container).toMatchSnapshot();
  });

  describe('when a title, headers, and items are passed', () => {
    const $1 = $0({
      props: () => ({
        ...$0.props,
        title: 'Distribuição de trabalho',
        headers: ['nome', 'tarefa'],
        items: [
          ['fulano', 'louça'],
          ['fulano', 'aspirar'],
          ['fulano', 'lavar roupas'],
          ['hoyer', 'assistir youtube'],
        ],
      }),
    });

    it('displays the title', () => {
      expect($1.wrapper.container).toMatchSnapshot();
    });

    describe('when the header defines an alignment', () => {
      const $2 = $1({
        props: () => ({
          ...$1.props,
          headers: ['nome', { text: 'tarefa', align: 'left' }],
        }),
      });

      it('aligns the second column to the left', () => {
        expect($2.wrapper.container).toMatchSnapshot();
      });
    });
  });
});
