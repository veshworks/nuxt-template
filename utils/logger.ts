const doLog = true;

/**
 * @description Log a message to the console
 */
export function logDebug(namespace: string, ...args: any[]) {
  if (!doLog) return;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, no-console
  console.log(`[DEBUG(${namespace})]:`, ...args);
}
