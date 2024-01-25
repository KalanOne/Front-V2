export function alphabeticalSort(key) {
  return (a, b) => {
    if (a[key] > b[key]) {
      return 1;
    } else if (b[key] > a[key]) {
      return -1;
    }
    return 0;
  };
}
