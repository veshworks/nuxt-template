<script setup lang="ts">
const props = withDefaults(defineProps<{
  textLines?: number;
}>(), {
  textLines: 5,
});

const textEl = ref<HTMLElement | null>(null);
const isOverflowing = ref(false);
const isCollapsed = ref(true);

const toggleText = computed(() => {
  return isCollapsed.value
    ? 'Show more'
    : 'Show less';
});

const updateTextOverflowAsync = async () => {
  if (textEl.value === null) {
    isOverflowing.value = false;
    return;
  }

  if (textEl.value.hasChildNodes()) {
    const children = Array.from(textEl.value.children);
    const first = children.at(0) as HTMLElement;
    const last = children.at(-1) as HTMLElement;

    if (first.style.marginTop) {
      textEl.value.style.marginTop = first.style.marginTop;
      first.style.marginTop = '0';
    }

    if (last.style.marginBottom) {
      textEl.value.style.marginBottom = last.style.marginBottom;
      last.style.marginBottom = '0';
    }
  }

  await nextTick();

  const { scrollHeight, offsetHeight } = textEl.value;
  isOverflowing.value = scrollHeight > offsetHeight;
};

const updateTextOverflow = () => void updateTextOverflowAsync();

const mutationObserver = ref(null as MutationObserver | null);

onMounted(() => {
  if (textEl.value === null) throw new Error('textEl ref is not defined');

  mutationObserver.value = new MutationObserver(updateTextOverflow);

  mutationObserver.value.observe(textEl.value, {
    childList: true,
    subtree: true,
  });

  updateTextOverflow();
  window.addEventListener('resize', updateTextOverflow, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateTextOverflow);
});
</script>

<template>
  <div
    ref="textEl"
    :class="['ui-text-collapse__text', {
      'ui-text-collapse__text--collapsed': isCollapsed,
      'ui-text-collapse__text--overflowing': isOverflowing && isCollapsed,
    }]"
    :style="`--max-lines: ${props.textLines}`"
  >
    <slot />
  </div>

  <div class="ui-text-collapse__link">
    <a
      v-show="isOverflowing"
      aria-hidden="true"
      tabindex="-1"
      tag="button"
      @click="isCollapsed = !isCollapsed"
    >
      {{ toggleText }}
    </a>
  </div>
</template>

<style lang="scss" scoped>
.ui-text-collapse__text {
  -webkit-box-orient: vertical;
  display: block;
  display: -webkit-box;
  hyphens: auto;
  margin-block: 0;
  overflow: hidden;
  overflow-wrap: break-word;
  text-overflow: ellipsis;
  word-break: break-word;
}

.ui-text-collapse__text--collapsed {
  --max-lines: 1;

  -webkit-line-clamp: var(--max-lines);
  max-height: calc((1em * var(--text-line-height) * var(--max-lines)));
}

.ui-text-collapse__text--overflowing {
  mask-image: linear-gradient(to top, transparent, #000 3em);
}
</style>
