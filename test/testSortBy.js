import { deepEqual } from 'assert';
import { sortBy } from '..';

describe('sortBy', () => {
  it('does not sort on empty chain', () => {
    deepEqual(sortBy([]), []);
    deepEqual(sortBy([{ pet: 'dog' }]), [{ pet: 'dog' }]);
  });

  it('sorts empty array', () => {
    deepEqual(sortBy([], 'pet'), []);
    deepEqual(sortBy([], 'pet', 'age'), []);
  });

  it('sorts one element', () => {
    deepEqual(sortBy([{ pet: 'dog' }], 'pet'), [{ pet: 'dog' }]);

    const array = [{ pet: 'dog', sound: 'woof' }];
    const sorted = [{ pet: 'dog', sound: 'woof' }];
    deepEqual(sortBy(array, 'pet', 'age'), sorted);
  });

  it('sorts by one key', () => {
    const animals = [
      { pet: 'dog', age: 5, name: 'Furball' },
      { pet: 'dog', age: 3, name: 'Ruffles' },
      { pet: 'cat', age: 4 },
    ];

    const sorted = [
      { pet: 'dog', age: 3, name: 'Ruffles' },
      { pet: 'cat', age: 4 },
      { pet: 'dog', age: 5, name: 'Furball' },
    ];

    deepEqual(sortBy(animals, 'age'), sorted);
  });

  it('sorts by more than one key', () => {
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

    deepEqual(sortBy(animals, 'pet', 'age'), sorted);
  });

  it('does not sort with nonexistent key', () => {
    deepEqual(sortBy([{ name: 'Fluffy' }], 'no_such_key'), [{ name: 'Fluffy' }]);
  });

  it('sorts using reverse order', () => {
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

    deepEqual(sortBy(animals, '-age', 'pet'), sorted);
    deepEqual(animals, sorted);
  });
});
