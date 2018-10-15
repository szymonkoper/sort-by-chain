const simpleComparator = (a, b) => {
  if (a < b) {
    return 1;
  } if (a > b) {
    return -1;
  }
  return 0;
};

const alwaysEqualComparator = () => 0;

const keyValueComparator = (chainElement) => {
  const { key, reverse } = chainElement;

  return reverse
    ? (a, b) => simpleComparator(a[key], b[key])
    : (a, b) => simpleComparator(b[key], a[key]);
};

const objComparator = (chain) => {
  const keyValueComparators = chain.map(keyValueComparator);

  return (a, b) => {
    const firstNonEqualKeyComparator = keyValueComparators.find(cmp => cmp(a, b));
    return (firstNonEqualKeyComparator || alwaysEqualComparator)(a, b);
  };
};

const chainElementFromKey = key => (
  key.startsWith('-') ? { key: key.slice(1), reverse: true } : { key }
);

export function sortByChain(array, chain) {
  return array.sort(objComparator(chain));
}

export function sortBy(array, ...keys) {
  return sortByChain(array, keys.map(chainElementFromKey));
}
