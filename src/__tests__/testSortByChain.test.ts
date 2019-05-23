import { sortByChain } from "..";

type Animal = {
  pet: string,
  age?: number,
  sound?: string,
  name?: string
};

test('does not sort on empty chain', () => {
  expect(
    sortByChain([], [])
  ).toStrictEqual(
    []
  );

  expect(
    sortByChain([{ pet: 'dog' }], [])
  ).toStrictEqual(
    [{ pet: 'dog' }]
  );
});

test('sorts empty array', () => {
  expect(
    sortByChain<Animal>([], [{ valueGetter: it => it.age }, { valueGetter: it => it.name }])
  ).toStrictEqual(
    []
  );
})

test('sorts one element', () => {
  expect(
    sortByChain<Animal>([{ pet: 'dog' }], [{ valueGetter: it => it.pet }])
  ).toStrictEqual(
    [{ pet: 'dog' }]
  );

  expect(
    sortByChain<Animal>(
      [{ pet: 'dog', sound: 'woof' }],
      [{ valueGetter: it => it.pet }, { valueGetter: it => it.age }]
    )
  ).toStrictEqual(
    [{ pet: 'dog', sound: 'woof' }]
  );
})

test('sorts by one key', () => {
  let animals = [
    { pet: 'dog', age: 5, name: 'Furball' },
    { pet: 'dog', age: 3, name: 'Ruffles' },
    { pet: 'cat', age: 4 },
  ];

  let sorted = [
    { pet: 'dog', age: 3, name: 'Ruffles' },
    { pet: 'cat', age: 4 },
    { pet: 'dog', age: 5, name: 'Furball' },
  ];

  const chain = [{ valueGetter: (it: Animal) => it.age }];

  expect(sortByChain(animals, chain)).toStrictEqual(sorted)
  expect(animals).toStrictEqual(sorted);
})

test('sorts by more than one key', () => {
  const animals = [
    { pet: 'dog', age: 5 },
    { pet: 'dog', age: 3 },
    { pet: 'cat', age: 4 },
  ];

  const sorted = [
    { pet: 'cat', age: 4 },
    { pet: 'dog', age: 3 },
    { pet: 'dog', age: 5 },
  ];

  const chain = [{ valueGetter: (it: Animal) => it.pet }, { valueGetter: (it: Animal) => it.age }];

  expect(sortByChain(animals, chain)).toStrictEqual(sorted)
  expect(animals).toStrictEqual(sorted);
})

test('sorts using reverse order', () => {
  const animals = [
    { pet: 'dog', age: 5 },
    { pet: 'cat', age: 4 },
    { pet: 'dog', age: 3 },
    { pet: 'alpaca', age: 4 },
  ];

  const sorted = [
    { pet: 'dog', age: 5 },
    { pet: 'alpaca', age: 4 },
    { pet: 'cat', age: 4 },
    { pet: 'dog', age: 3 },
  ];

  const chain = [{ valueGetter: (it: Animal) => it.age, reverse: true }, { valueGetter: (it: Animal) => it.pet }];

  expect(sortByChain(animals, chain)).toStrictEqual(sorted)
  expect(animals).toStrictEqual(sorted);
})

test('sorts using custom comparator', () => {
  const animals = [
    { pet: 'dog', age: 5 },
    { pet: 'cat', age: 4 },
    { pet: 'ox', age: 4 },
    { pet: 'dog', age: 3 },
    { pet: 'alpaca', age: 4 },
  ];

  const stringLengthComparator = (a: string, b: string) => b.length - a.length;

  const sorted = [
    { pet: 'ox', age: 4 },
    { pet: 'dog', age: 5 },
    { pet: 'cat', age: 4 },
    { pet: 'dog', age: 3 },
    { pet: 'alpaca', age: 4 },
  ];

  const chain = [{ valueGetter: (it: Animal) => it.pet, comparator: stringLengthComparator }];
  
  expect(sortByChain(animals, chain)).toStrictEqual(sorted)
  expect(animals).toStrictEqual(sorted);
})
