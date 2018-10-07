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

export function sortByChain(array, chain) {
  return chain
    .map(e => compareFn(e))
    .reduceRight((arr, cmpFn) => arr.sort(cmpFn), array);
}

export function sortBy(array, ...chain) {
  return sortByChain(array, chain.map(key => ({ key })));
}
