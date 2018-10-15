const simpleComparator = (a, b) => {
  if (a < b) {
    return 1;
  } if (a > b) {
    return -1;
  }
  return 0;
};

const alwaysEqualComparator = () => 0;

const valueComparator = (chainElement) => {
  const { valueGetter, reverse, comparator } = chainElement;

  return reverse
    ? (a, b) => (comparator || simpleComparator)(valueGetter(a), valueGetter(b))
    : (a, b) => (comparator || simpleComparator)(valueGetter(b), valueGetter(a));
};

const objComparator = chain => (a, b) => {
  const firstNonEqualKeyComparator = chain.map(valueComparator).find(cmp => cmp(a, b));
  return (firstNonEqualKeyComparator || alwaysEqualComparator)(a, b);
};

const chainElementFromKey = key => (
  key.startsWith('-') ? { valueGetter: it => it[key.slice(1)], reverse: true } : { valueGetter: it => it[key] }
);

export function sortByChain(array, chain) {
  return array.sort(objComparator(chain));
}

export function sortBy(array, ...keys) {
  return sortByChain(array, keys.map(chainElementFromKey));
}
