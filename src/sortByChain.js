const compareFn = (chainElement) => {
  const { key, reverse } = chainElement;
  const orderValue = reverse ? 1 : -1;

  return (a, b) => {
    if (a[key] < b[key]) {
      return orderValue;
    } if (a[key] > b[key]) {
      return -orderValue;
    }

    return 0;
  };
};

const chainElemFromKey = key => (
  key.startsWith('-') ? { key: key.slice(1), reverse: true } : { key }
);

export function sortByChain(array, chain) {
  return chain
    .map(compareFn)
    .reduceRight((arr, cmpFn) => arr.sort(cmpFn), array);
}

export function sortBy(array, ...keys) {
  return sortByChain(array, keys.map(chainElemFromKey));
}
