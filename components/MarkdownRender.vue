<script lang="ts">
import { computed, defineComponent, h } from 'vue';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({});

export default defineComponent({
  name: 'MarkdownRender',
  props: {
    source: {
      type: String,
      required: true,
    },
  },
  setup(props, { attrs }) {
    const content = computed(() => md.render(props.source));

    return () => h('div', {
      ...attrs,
      innerHTML: content.value,
      class: 'markdown-render',
    });
  },
});
</script>

<style lang="scss">
.markdown-render {
  overflow: hidden;

  p {
    margin-block: var(--space-0200);

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
