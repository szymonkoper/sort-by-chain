import { sortBy } from '..'

type Animal = {
  pet: string,
  age?: number,
  sound?: string,
  name?: string
};

test('does not sort on empty chain', () => {
  expect(
    sortBy<Animal>([])
  ).toStrictEqual(
    []
  );

  expect(
    sortBy<Animal>([{ pet: 'dog' }])
  ).toStrictEqual(
    [{ pet: 'dog' }]
  );
});

test('sorts empty array', () => {
  expect(
    sortBy<Animal>([], "pet")
  ).toStrictEqual(
    []
  );
  
  expect(
    sortBy<Animal>([], "pet", "age")
  ).toStrictEqual(
    []
  );
});

test('sorts one element', () => {
  expect(
    sortBy<Animal>([{ pet: 'dog' }], "pet")
  ).toStrictEqual(
    [{ pet: 'dog' }]
  )

  expect(
    sortBy<Animal>([{ pet: 'dog', sound: 'woof' }], "sound", "pet")
  ).toStrictEqual(
    [{ pet: 'dog', sound: 'woof' }]
  )
})

test('sorts by one key', () => {
  expect(
    sortBy([
      { pet: 'dog', age: 5, name: 'Furball' },
      { pet: 'dog', age: 3, name: 'Ruffles' },
      { pet: 'cat', age: 4 },
    ], "age")
  ).toStrictEqual([
    { pet: 'dog', age: 3, name: 'Ruffles' },
    { pet: 'cat', age: 4 },
    { pet: 'dog', age: 5, name: 'Furball' },
  ])
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

  expect(sortBy(animals, 'pet', 'age')).toStrictEqual(sorted);
  expect(animals).toStrictEqual(sorted);
})

test('does not sort with nonexistent key', () => {
  expect(
    sortBy([{ name: 'Fluffy' }], 'no_such_key')
  ).toStrictEqual(
    [{ name: 'Fluffy' }]
  );
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

  expect(
    sortBy(animals, '-age', 'pet')
  ).toStrictEqual(sorted);
  expect(animals).toStrictEqual(sorted);
})
