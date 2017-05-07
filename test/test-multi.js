var assert = require('assert');
var Path = require('path');
var Fs = require('fs-extra');
var sanitize = require('sanitize-filename');
var Cache = require('../');
// supports multiple instances
describe('cacheman-file-multi', function() {
  var cache1,
    cache2;

  before(function(done) {
    cache1 = new Cache({
      tmpDir: Path.join(process.cwd(), 'temp')
    }, {});
    cache2 = new Cache({
      tmpDir: Path.join(process.cwd(), 'temp')
    }, {});
    done();
  });
  after(function(done) {
    cache1.clear('test');
    cache2.clear('test');
    done();
  });

  it('should store items', function(done) {
    cache1.set('test1', {
      a: 1
    }, function(err) {
      if (err)
        return done(err);
      cache1.get('test1', function(err, data) {
        if (err)
          return done(err);
        assert.equal(data.a, 1);
        done();
      });
    });
  });
  it('should get stored items', function(done) {
    cache1.get('test1', function(err, data) {
      if (err)
        return done(err);
      assert.equal(data.a, 1);
      cache2.get('test1', function(err, data) {
        if (err)
          return done(err);
        try {
          assert.notEqual(data, null)
          assert.equal(data.a, 1)
          done()
        } catch (e) {
          done(e)
        }
      });
    });
  });
  it('should get all items from each instances', function(done) {
    cache1.set('test1', {
      b: 1
    }, function(err) {
      if (err)
        return done(err);
      cache1.set('test2', {
        b: 1
      }, function(err) {
        if (err)
          return done(err);
        cache1.set('test3', {
          b: 1
        }, function(err) {
          if (err)
            return done(err);
          cache2.getAll(function(err, data) {
            if (err)
              return done(err);
            assert.equal(data.length, 3);
            done();
          });
        });
      });
    });
  });
});
