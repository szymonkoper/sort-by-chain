import { deepEqual } from 'assert';
import { sortByChain } from '..';
import deepFreeze from 'deep-freeze';

// class Person {
//   constructor(name, surname, age) {
//     this.name = name;
//     this.surname = surname;
//     this.age = age;
//   }
// }

// const P_G_SMITH_55 = new Person('George', 'Smith', 55);
// const P_H_JONES_33 = new Person('Harry', 'Jones', 33);
// const P_G_SMITH_33 = new Person('George', 'Smith', 33);
// const P_J_JONES_44 = new Person('Jacob', 'Jones', 44);

// const PEOPLE = [
//   P_G_SMITH_55,
//   P_H_JONES_33,
//   P_G_SMITH_33,
//   P_J_JONES_44,
// ];

describe('sortByChain', () => {
  it('does not sort on empty chain', () => {
    deepEqual(sortByChain([], []), []);
    deepEqual(sortByChain([{ pet: 'dog' }], []), [{ pet: 'dog' }]);
  });

  it('sorts empty array', () => {
    const chain = [{ key: 'age' }, { key: 'name' }];
    deepFreeze(chain);

    deepEqual(sortByChain([], chain), []);
  });

  it('sorts one element', () => {
    deepEqual(sortByChain([{ pet: 'dog' }], [{ key: 'pet' }]), [{ pet: 'dog' }]);

    const array = [{ pet: 'dog', sound: 'woof' }];
    const sorted = [{ pet: 'dog', sound: 'woof' }];

    const chain = [{ key: 'pet' }, { key: 'age' }];
    deepFreeze(chain);

    deepEqual(sortByChain(array, chain), sorted);
    deepEqual(array, sorted);
  });

  it('sorts by one ket', () => {
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

    const chain = [{ key: 'age' }];
    deepFreeze(chain);

    deepEqual(sortByChain(animals, chain), sorted);
    deepEqual(animals, sorted);
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

    const chain = [{ key: 'pet' }, { key: 'age' }];
    deepFreeze(chain);

    deepEqual(sortByChain(animals, chain), sorted);
    deepEqual(animals, sorted);
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

    const chain = [{ key: 'age', reverse: true }, { key: 'pet' }];
    deepFreeze(chain);

    deepEqual(sortByChain(animals, chain), sorted);
    deepEqual(animals, sorted);
  });
});
