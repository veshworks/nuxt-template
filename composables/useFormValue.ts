export function useFormValue<T>(entityId: string, index: number, defaultValue: T) {
  const entityIdUnrawped = toValue(entityId);
  const indexUnrawped = toValue(index);
  const defaultValueUnwraped = structuredClone(toValue(defaultValue));

  const formValue = ref(defaultValueUnwraped);
  const palace = usePalaceStore();

  watchEffect(() => {
    palace.setAnswer({
      entityId: entityIdUnrawped,
      index: indexUnrawped,
    }, formValue.value);
  });

  return {
    formValue,
  };
}
