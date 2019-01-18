# sort-by-chain


[![build state](https://img.shields.io/travis/szymonkoper/sort-by-chain/master.svg)](https://travis-ci.com/szymonkoper/sort-by-chain)
[![install size](https://packagephobia.now.sh/badge?p=sort-by-chain)](https://packagephobia.now.sh/result?p=sort-by-chain)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)


> Sort array by one or chain of properties with custom comparators

Experimental project. There is possibility of critical bugs and breaking changes in future.


## Install

```
$ npm install --save sort-by-chain
```

or 

```
$ yarn add sort-by-chain
```


## Usage

### Simple sorting

Import package:

```js
import { sortBy } from 'sort-by-chain';
```

With `sortBy` you just write keys as strings. Custom comparators are not supported this way.

```js
sortBy(animals, '-age', 'pet');
/*
[
  { pet: 'dog', age: 5, name: 'Furball' },
  { pet: 'alpaca', age: 4 },
  { pet: 'cat', age: 4 },
  { pet: 'dog', age: 3, name: 'Ruffles' },
]
*/
```


### More customized sorting

Import package:

```js
import { sortByChain } from 'sort-by-chain';
```

With `sortByChain` you can specify sorting chain with some customizations.

```js
const animals = [
  { pet: 'dog', age: 5, name: 'Furball' },
  { pet: 'cat', age: 4 },
  { pet: 'ox', age: 4 },
  { pet: 'dog', age: 3, name: 'Ruffles' },
  { pet: 'alpaca', age: 4 },
];

const chain = [
  { valueGetter: it => it.age, reverse: true },
  { valueGetter: it => it.pet },
];

sortByChain(animals, chain);
/*
[
  { pet: 'dog', age: 5, name: 'Furball' },
  { pet: 'alpaca', age: 4 },
  { pet: 'cat', age: 4 },
  { pet: 'ox', age: 4 },
  { pet: 'dog', age: 3, name: 'Ruffles' },
];
*/
```

You can also specify custom comparators.

```js
const stringLengthComparator = (a, b) => b.length - a.length;

const chain = [{ valueGetter: it => it.pet, comparator: stringLengthComparator }];

sortByChain(animals, chain)
/*
[
  { pet: 'ox', age: 4 },
  { pet: 'dog', age: 5, name: 'Furball' },
  { pet: 'cat', age: 4 },
  { pet: 'dog', age: 3, name: 'Ruffles' },
  { pet: 'alpaca', age: 4 },
];
*/
```


## License

MIT
