const assert = require('power-assert')
const whatUrTypeIs = require('../src/whatUrTypeIs')

describe('Type Testing', () => {
  context('Base Type', () => {
    it('123 is number', (done) => {
      assert.equal(whatUrTypeIs(123), 'number')
      done()
    })
    it('NaN is NaN', (done) => {
      assert.equal(whatUrTypeIs(NaN), 'NaN')
      done()
    })
    it('"hello world" is string', (done) => {
      assert.equal(whatUrTypeIs('hello world'), 'string')
      done()
    })
    it('null is null', (done) => {
      assert.equal(whatUrTypeIs(null), 'null')
      done()
    })
    it('undefined is undefined', (done) => {
      assert.equal(whatUrTypeIs(undefined), 'undefined')
      done()
    })
    it('true is boolean', (done) => {
      assert.equal(whatUrTypeIs(true), 'boolean')
      done()
    })
    it('false is boolean', (done) => {
      assert.equal(whatUrTypeIs(false), 'boolean')
      done()
    })
    it('/1/ is regexp', (done) => {
      assert.equal(whatUrTypeIs(/1/), 'regexp')
      done()
    })
  })
  context('Reference Type', () => {
    it('[] is array', (done) => {
      assert.equal(whatUrTypeIs([]), 'array')
      done()
    })
    it('{} is object', (done) => {
      assert.equal(whatUrTypeIs({}), 'object')
      done()
    })
  })
  context('Function trans', () => {
    it('Number() is number', (done) => {
      assert.equal(whatUrTypeIs(Number()), 'number')
      done()
    })
    it('Number("abc") is NaN', (done) => {
      assert.equal(whatUrTypeIs(Number("abc")), 'NaN')
      done()
    })
    it('String() is string', (done) => {
      assert.equal(whatUrTypeIs(String()), 'string')
      done()
    })
    it('Boolean() is boolean', (done) => {
      assert.equal(whatUrTypeIs(Boolean()), 'boolean')
      done()
    })
    it('Array() is array', (done) => {
      assert.equal(whatUrTypeIs(Array()), 'array')
      done()
    })
    it('Object({}) is object', (done) => {
      assert.equal(whatUrTypeIs(Object({})), 'object')
      done()
    })
    it('Object.create(null) is object', (done) => {
      assert.equal(whatUrTypeIs(Object.create(null)), 'object')
      done()
    })
    it('Symbol() is symbol', (done) => {
      assert.equal(whatUrTypeIs(Symbol()), 'symbol')
      done()
    })
  })
  context('New a Number instance', () => {
    it('new Number() is number', (done) => {
      assert.equal(whatUrTypeIs(new Number()), 'number')
      done()
    })
    it('new Number(123) is number', (done) => {
      assert.equal(whatUrTypeIs(new Number(123)), 'number')
      done()
    })
    it('new Number("123") is number', (done) => {
      assert.equal(whatUrTypeIs(new Number("123")), 'number')
      done()
    })
    it('new Number("abc") is NaN', (done) => {
      assert.equal(whatUrTypeIs(new Number("abc")), 'NaN')
      done()
    })
    it('new Number(NaN) is NaN', (done) => {
      assert.equal(whatUrTypeIs(new Number(NaN)), 'NaN')
      done()
    })
  })
  context('New a String instance', () => {
    it('new String() is string', (done) => {
      assert.equal(whatUrTypeIs(new String()), 'string')
      done()
    })
    it('new String(123) is string', (done) => {
      assert.equal(whatUrTypeIs(new String(123)), 'string')
      done()
    })
  })
  context('New a Boolean instance', () => {
    it('new Boolean() is boolean', (done) => {
      assert.equal(whatUrTypeIs(new Boolean()), 'boolean')
      done()
    })
    it('new Boolean(true) is boolean', (done) => {
      assert.equal(whatUrTypeIs(new Boolean(true)), 'boolean')
      done()
    })
    it('new Boolean("abc") is boolean', (done) => {
      assert.equal(whatUrTypeIs(new Boolean("abc")), 'boolean')
      done()
    })
  })
  context('New an Array instance', () => {
    it('new Array(1) is array', (done) => {
      assert.equal(whatUrTypeIs(new Array(1)), 'array')
      done()
    })
  })
  context('New an Object instance', () => {
    it('new Object() is object', (done) => {
      assert.equal(whatUrTypeIs(new Object()), 'object')
      done()
    })
  })
  context('New an Set instance', () => {
    it('new Set() is set', (done) => {
      assert.equal(whatUrTypeIs(new Set()), 'set')
      done()
    })
    it('new WeakSet() is weakset', (done) => {
      assert.equal(whatUrTypeIs(new WeakSet()), 'weakset')
      done()
    })
  })
  context('New an Map instance', () => {
    it('new Map() is map', (done) => {
      assert.equal(whatUrTypeIs(new Map()), 'map')
      done()
    })
    it('new WeakMap() is weakmap', (done) => {
      assert.equal(whatUrTypeIs(new WeakMap()), 'weakmap')
      done()
    })
  })
  context('New an RegExp instance', () => {
    it('new RegExp() is regexp', (done) => {
      assert.equal(whatUrTypeIs(new RegExp()), 'regexp')
      done()
    })
  })
  context('A function type', () => {
    it('function A () {} is function', (done) => {
      assert.equal(whatUrTypeIs(function A () {}), 'function')
      done()
    })
  })
})