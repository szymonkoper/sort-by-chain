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
const people = [
  { name: 'Adam', age: 44 },
  { name: 'Eve', age: 22 },
  { name: 'John', age: 11 },
  { name: 'Adam', age: 22 },
];

const chain = [{ key: 'age', reverse: true }, { key: 'name' }];

sortByChain(people, chain); // also returns people

console.log(people)
/*
[
  { name: 'Adam', age: 44 },
  { name: 'Adam', age: 22 },
  { name: 'Eve', age: 22 },
  { name: 'John', age: 11 },
]
*/
```

There is also simpler function `sortBy`, where you just write keys:

```js
sortBy(people, 'age', 'name');

console.log(people)
/*
[
  { name: 'John', age: 11 },
  { name: 'Adam', age: 22 },
  { name: 'Eve', age: 22 },
  { name: 'Adam', age: 44 },
]
*/
```


## License

MIT
