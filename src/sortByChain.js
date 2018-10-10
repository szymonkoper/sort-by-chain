const simpleComparator = (a, b) => {
  if (a < b) {
    return 1;
  } if (a > b) {
    return -1;
  }

  return 0;
};

const keyValueComparator = (chainElement) => {
  const { key, reverse } = chainElement;
  const orderValue = reverse ? 1 : -1;

  return (a, b) => simpleComparator(a[key], b[key]) * orderValue;
};

const objComparator = (chain) => {
  const keyValueComparators = chain.map(keyValueComparator);

  return (a, b) => {
    const firstDiffCmp = keyValueComparators.find(cmp => cmp(a, b));
    return firstDiffCmp ? firstDiffCmp(a, b) : 0;
  };
};

const chainElemFromKey = key => (
  key.startsWith('-') ? { key: key.slice(1), reverse: true } : { key }
);

export function sortByChain(array, chain) {
  return array.sort(objComparator(chain));
}

export function sortBy(array, ...keys) {
  return sortByChain(array, keys.map(chainElemFromKey));
}
