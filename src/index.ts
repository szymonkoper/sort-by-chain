type ValueComparator = (a?: any, b?: any) => number;
type ValueGetter = (item: any) => any;

type ChainItem<T> = {
  comparator?: ValueComparator;
  reverse?: boolean;
  valueGetter: ValueGetter
};

function simpleComparator<V>(av: V, bv: V): number {
  if (av < bv) {
    return 1;
  } if (av > bv) {
    return -1;
  }
  return 0;
}

function alwaysEqualComparator<T>(a?: T, b?: T): number { return 0 }

function buildValueComparator<T>(chainItem: ChainItem<T>) {
  let { comparator, reverse, valueGetter } = chainItem;

  return reverse
    ? (a: T, b: T) => (comparator || simpleComparator)(valueGetter(a), valueGetter(b))
    : (a: T, b: T) => (comparator || simpleComparator)(valueGetter(b), valueGetter(a));
}

function buildObjComparator<T>(chain: ChainItem<T>[]) {
  return function(a: T, b: T): number {
    let firstNonEqualKeyComparator = chain.map(buildValueComparator).find(cmp => !!cmp(a, b));
    return (firstNonEqualKeyComparator || alwaysEqualComparator)(a, b);
  }
}

function chainElementFromKey<T>(key: string): ChainItem<T> {
  if (key.startsWith('-')) {
    return {
      valueGetter: (it: any) => it[key.slice(1)],
      reverse: true
    }
  } else {
    return {
      valueGetter: (it: any) => it[key],
      reverse: false
    }
  }
}

export function sortByChain<T>(array: T[], chain: ChainItem<T>[]) {
  return array.sort(buildObjComparator<T>(chain));
}

export function sortBy<T>(array: T[], ...keys: string[]): T[] {
  return sortByChain<T>(array, keys.map(chainElementFromKey));
}
