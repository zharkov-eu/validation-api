/*
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * @author Evgeni Zharkov <zharkov.ev.u@yandex.ru>
 */

"use strict";

import "mocha";

import * as assert from "assert";
import { AbstractValidated, NotEmptyString, Validate, ValidationError } from "../index";

describe("AbstractValidated test", () => {
  @Validate()
  class TestClass extends AbstractValidated {
    @NotEmptyString()
    private prop: string;

    constructor(object: { prop: string }) {
      super(object);
      this.prop = object.prop;
    }
  }

  it("Stop processing when passing a undefined value", () => {
    assert.throws(() => {
      const test = new TestClass(undefined as any);
    }, ValidationError);
  });

  it("Correctly process NotEmptyString constraints", () => {
    assert.doesNotThrow(() => {
      const test = new TestClass({ prop: "property" });
    });
  });
});
