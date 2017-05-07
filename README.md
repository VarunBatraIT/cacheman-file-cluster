# cacheman-file-cluster

File caching library supporting clusters and multiple instances for Node.JS and also cache engine for [cacheman](https://github.com/cayasso/cacheman).


[![Build Status](https://travis-ci.org/VarunBatraIT/cacheman-file-cluster.svg?branch=master)](https://travis-ci.org/VarunBatraIT/cacheman-file-cluster)

## Instalation

``` bash
$ npm i cacheman-file-cluster -S
```

## Usage

```javascript
var CachemanFile = require('cacheman-file-cluster');
var cache = new CachemanFile();

// set the value
cache.set('my key', { foo: 'bar' }, function (error) {

  if (error) throw error;

  // get the value
  cache.get('my key', function (error, value) {

    if (error) throw error;

    console.log(value); //-> {foo:"bar"}

    // delete entry
    cache.del('my key', function (error){

      if (error) throw error;

      console.log('value deleted');
    });

  });
});
```

## API

### CachemanFile()

Create `cacheman-file-cluster` instance.

```javascript
var cache = new CachemanFile();
```

### cache.set(key, value, [ttl, [fn]])

Stores or updates a value.

```javascript
cache.set('foo', { a: 'bar' }, function (err, value) {
  if (err) throw err;
  console.log(value); //-> {a:'bar'}
});
```

Or add a TTL(Time To Live) in seconds like this:

```javascript
// key will expire in 60 seconds
cache.set('foo', { a: 'bar' }, 60, function (err, value) {
  if (err) throw err;
  console.log(value); //-> {a:'bar'}
});
```

### cache.get(key, fn)

Retrieves a value for a given key, if there is no value for the given key a null value will be returned.

```javascript
cache.get(function (err, value) {
  if (err) throw err;
  console.log(value);
});
```

### cache.del(key, [fn])

Deletes a key out of the cache.

```javascript
cache.del('foo', function (err) {
  if (err) throw err;
  // foo was deleted
});
```

### cache.clear([fn])

Clear the cache entirely, throwing away all values.

```javascript
cache.clear(function (err) {
  if (err) throw err;
  // cache is now clear
});
```

### cache.getAll([fn])

Get all entries in the cache. Entries are returned as an array

```javascript
cache.set('foo', { a: 'bar' }, 10, function (err, result) {
  cache.getAll(function (err, results) {
    console.log(results) // [ { a: 'bar' } ]
  });
});
```

## Run tests

``` bash
$ make test
```

## License

MIT License
