'use strict';

import { assert } from 'chai';
import { describe, it } from 'mocha';
import { AbstractValidated, NotEmptyString, Validate } from '../dist';

describe('AbstractValidated test', () => {
  @Validate()
  class TestClass extends AbstractValidated {
    @NotEmptyString()
    private prop: string;

    constructor(object: { prop: string }) {
      super(object);
      this.prop = object.prop;
    }
  }

  it('Stop processing when passing a undefined value', () => {
    assert.throws(() => {
      new TestClass(undefined as any);
    });
  });

  it('Correctly process NotEmptyString constraints', () => {
    assert.doesNotThrow(() => {
      new TestClass({ prop: 'property' });
    });
  });
});
