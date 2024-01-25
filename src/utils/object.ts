export {
  removeUndefined,
  filterNonObjects,
  removeNaN,
  removeNull,
  removeCharacters,
};

interface Indexable {
  [key: string]: unknown;
}
// removeUndefinedAndEmptyArrays
function removeUndefined(obj: Indexable): void {
  Object.keys(obj).forEach((key) =>
    obj[key] === undefined ? delete obj[key] : {},
  );
}

function removeNull<T>(o: T) {
  const obj = o as Indexable;
  Object.keys(obj).forEach((key) => (obj[key] === null ? delete obj[key] : {}));
  return o;
}
/**
 * Remove all keys from an object, for which their value is not of type Object
 */
function filterNonObjects(obj: object): Record<string, object> {
  const entries = Object.entries(obj);
  const filteredEntries = entries.filter((e) => typeof e[1] === "object");
  return Object.fromEntries(filteredEntries);
}

function removeNaN<T>(o: T): T {
  const obj = o as Indexable;
  Object.keys(obj).forEach((key) =>
    Number.isNaN(obj[key] as number) ? delete obj[key] : {},
  );
  return o;
}

function removeCharacters(string: string, replacer = "") {
  return string.replaceAll(/[,\s\.\/#]/g, replacer);
}
