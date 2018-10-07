# sort-by-chain

> Sort array by key or multiple keys with specific order type

Experimental project. There is possibility of critical bugs and breaking changes in future.


## Install

```
$ npm install --save sort-by-chain
```


## Usage

Import package:

```js
import { sortBy, sortByChain } from 'sort-by-chain';
```

With `sortByChain` you can specify sorting chain with some customizations.
Leftmost chain elements have bigger impact on order.

```js
  const animals = [
    { pet: 'dog', age: 5, name: 'Furball' },
    { pet: 'cat', age: 4 },
    { pet: 'dog', age: 3, name: 'Ruffles' },
    { pet: 'alpaca', age: 4 },
  ];

const chain = [{ key: 'age', reverse: true }, { key: 'pet' }];

sortByChain(animals, chain); // sorts animals in-place and also returns result

console.log(animals);
/*
[
  { pet: 'dog', age: 5, name: 'Furball' },
  { pet: 'alpaca', age: 4 },
  { pet: 'cat', age: 4 },
  { pet: 'dog', age: 3, name: 'Ruffles' },
];
*/
```

There is also simpler function `sortBy`, where you just write keys:

```js
sortBy(animals, 'age', 'name');

console.log(animals)
/*
[
  { pet: 'dog', age: 3, name: 'Ruffles' },
  { pet: 'alpaca', age: 4 },
  { pet: 'cat', age: 4 },
  { pet: 'dog', age: 5, name: 'Furball' },
]
*/
```


## License

MIT
