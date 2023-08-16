export function getAbsoluteFrequency<T>(items: T[]): Map<T, number> {
  if (items.length === 0) {
    return new Map<T, number>();
  }

  const frequency = new Map<T, number>();
  for (const item of items) {
    if (frequency.has(item)) {
      frequency.set(item, (frequency.get(item) as number) + 1);
    } else {
      frequency.set(item, 1);
    }
  }

  return frequency;
}

export function getRelativeFrequency<T>(
  items: T[],
  absoluteFrequency?: Map<T, number>
): Map<T, number> {
  const absolute: Map<T, number> =
    absoluteFrequency === undefined
      ? getAbsoluteFrequency(items)
      : absoluteFrequency;

  const relative: Map<T, number> = new Map<T, number>();
  const sum: number = getSum(Array.from(absolute.values()));

  absolute.forEach((value, key) => {
    relative.set(key, value / sum);
  });
  return relative;
}

function getSum(numbers: number[]): number {
  return numbers.reduce((sum, num) => sum + num, 0);
}
