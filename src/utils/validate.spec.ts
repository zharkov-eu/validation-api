'use strict';

import { assert } from 'chai';
import { describe, it } from 'mocha';
import * as validator from './validate';

describe('validateNotEmpty test', () => {
  it("return true if argument isn't null / undefined / NaN type", () => {
    assert.strictEqual(validator.validateNotEmpty(false), true);
  });
  it('return false if argument is null type', () => {
    assert.strictEqual(validator.validateNotEmpty(null), false);
  });
  it('return false if argument is undefined type', () => {
    assert.strictEqual(validator.validateNotEmpty(undefined), false);
  });
  it('return false if argument is NaN type', () => {
    assert.strictEqual(validator.validateNotEmpty(NaN), false);
  });
  it('return false if argument is empty Array', () => {
    assert.strictEqual(validator.validateNotEmptyString([]), false);
  });
});

describe('validateBoolean test', () => {
  it('return true if argument is boolean type', () => {
    assert.strictEqual(validator.validateBoolean(false), true);
  });
  it("return false if argument isn't boolean type", () => {
    assert.strictEqual(validator.validateBoolean('something'), false);
  });
});

describe('validateNumber test', () => {
  it('return true if argument is number type', () => {
    assert.strictEqual(validator.validateNumber(0), true);
  });
  it("return false if argument isn't number type", () => {
    assert.strictEqual(validator.validateNumber('something'), false);
  });
});

describe('validatePositiveNumber test', () => {
  it('return true if argument is number type and more than 0', () => {
    assert.strictEqual(validator.validatePositiveNumber(1), true);
  });
  it('return false if argument is number type and less or equal 0', () => {
    assert.strictEqual(validator.validatePositiveNumber(-1), false);
  });
  it("return false if argument isn't number type", () => {
    assert.strictEqual(validator.validatePositiveNumber('something'), false);
  });
});

describe('validatePositiveOrZeroNumber test', () => {
  it('return true if argument is number type and more than 0', () => {
    assert.strictEqual(validator.validatePositiveOrZeroNumber(1), true);
  });
  it('return true if argument is number type and equal 0', () => {
    assert.strictEqual(validator.validatePositiveOrZeroNumber(0), true);
  });
  it('return false if argument is number type and less than 0', () => {
    assert.strictEqual(validator.validatePositiveOrZeroNumber(-1), false);
  });
  it("return false if argument isn't number type", () => {
    assert.strictEqual(validator.validatePositiveOrZeroNumber('something'), false);
  });
});

describe('validateNotEmptyString test', () => {
  it('return true if argument is string type and not blank', () => {
    assert.strictEqual(validator.validateNotEmptyString('ab'), true);
  });
  it('return false if argument is string type and blank', () => {
    assert.strictEqual(validator.validateNotEmptyString(' '), false);
  });
  it('return false if argument is string type and empty', () => {
    assert.strictEqual(validator.validateNotEmptyString(''), false);
  });
  it("return false if argument isn't string type", () => {
    assert.strictEqual(validator.validateNotEmptyString(1), false);
  });
});

describe('validateIsArray test', () => {
  it("return false if argument isn't array type", () => {
    assert.strictEqual(validator.validateArray({}), false);
  });
  it('return true if argument is empty Array', () => {
    assert.strictEqual(validator.validateArray([]), true);
  });
});

describe('validateInclusive test', () => {
  it('return true if argument is member of inclusive', () => {
    assert.strictEqual(validator.validateInclusive('ad', ['fa', 'ad', 'ba']), true);
  });
  it('return false if argument is not member of inclusive', () => {
    assert.strictEqual(validator.validateInclusive('ad', ['ba, cf', 'cg']), false);
  });
});
