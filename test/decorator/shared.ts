/*------------------------------------------------------------------------------
 - Licensed under the MIT License. See License.txt in the project root for license information.
 - @author Evgeni Zharkov <zharkov.ev.u@yandex.ru>
 -----------------------------------------------------------------------------*/

"use strict";

import "mocha";

import * as assert from "assert";
import {ValidationError} from "../../index";
import {NotEmptyString} from "../../src/decorator/api";
import {Validate} from "../../src/decorator/shared";

@Validate({throwable: true})
class TestClass {
  @NotEmptyString({required: true})
  public requiredProperty: string;
  @NotEmptyString()
  public optionalProperty?: string;

  constructor(entity: { requiredProperty: string, optionalProperty?: string }) {
    this.requiredProperty = entity.requiredProperty;
    if (entity.optionalProperty) {
      this.optionalProperty = entity.optionalProperty;
    }
    Object.seal(this);
  }
}

describe("Validate decorator test", () => {
  it("Successful construct class with all arguments", () => {
    assert.doesNotThrow(() => {
      const test = new TestClass({requiredProperty: "some", optionalProperty: "next"});
    });
  });

  it("Successful construct class without optional property arguments", () => {
    assert.doesNotThrow(() => {
      const test = new TestClass({requiredProperty: "some"});
    });
  });

  it("Throw error when required property not presented", () => {
    assert.throws(() => {
      const test = new TestClass({optionalProperty: "text"} as any);
    }, ValidationError);
  });
});
