export function arrayJoin(
  array: Array<never>,
  separator: string,
  extra: string,
) {
  if (array.length >= 2) {
    return `${array.slice(0, -1).join(separator)}${extra}${array.slice(-1)}`;
  }
  return array.join(separator);
}

export function onlyUnique<T>(array: T[]): T[] {
  const hashMap = new Map();
  for (const item of array) {
    if (hashMap.has(item)) {
      hashMap.set(item, hashMap.get(item) + 1);
    } else {
      hashMap.set(item, 1);
    }
  }
  const uniqueValues = [];
  for (const [value, times] of hashMap.entries()) {
    if (times === 1) {
      uniqueValues.push(value);
    }
  }
  return uniqueValues;
}
