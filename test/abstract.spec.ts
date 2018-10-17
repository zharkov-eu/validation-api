/*
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * @author Evgeni Zharkov <zharkov.ev.u@yandex.ru>
 */

"use strict";

import "mocha";

import * as assert from "assert";
import { AbstractValidated, NotEmptyString, Validate } from "../index";
import { Constraint } from "../src/decorator/api";

describe("AbstractValidated test", () => {
  @Validate({ throwable: false })
  class A extends AbstractValidated {
    @NotEmptyString()
    private prop: string;

    constructor(a: any) {
      super(a);
      this.prop = a;
    }
  }

  it("Stop processing when passing a undefined value", () => {
    // const a = new A(undefined);
    // assert.strictEqual(a.__validationError()[0].constraint, Constraint.IsPresented);
  });

  it("Correctly process NotEmptyString constraints", () => {
    const a = new A({ a: "" });
    assert.strictEqual(a.__validationError()[0].constraint, Constraint.NotEmptyString);
  });
});
