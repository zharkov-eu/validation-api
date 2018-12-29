/*
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * @author Evgeni Zharkov <zharkov.ev.u@yandex.ru>
 */

"use strict";

import "mocha";

import * as assert from "assert";
import { NotEmptyString, Validate, ValidationError } from "../../index";
import { AbstractValidated } from "../../src/abstract";

@Validate()
class TestClass extends AbstractValidated {
  @NotEmptyString({ required: true })
  public requiredProperty: string;
  @NotEmptyString()
  public optionalProperty?: string;

  constructor(entity: { requiredProperty: string, optionalProperty?: string }) {
    super(entity);
    this.requiredProperty = entity.requiredProperty;
    if (entity.optionalProperty) {
      this.optionalProperty = entity.optionalProperty;
    }
  }
}

describe("Validate decorator test", () => {
  it("Successful construct class with all arguments", () => {
    assert.doesNotThrow(() => {
      const test = new TestClass({ requiredProperty: "some", optionalProperty: "next" });
    });
  });

  it("Successful construct class without optional property arguments", () => {
    assert.doesNotThrow(() => {
      const test = new TestClass({ requiredProperty: "some" });
    });
  });

  it("Throw error when required property not presented", () => {
    assert.throws(() => {
      const test = new TestClass({ optionalProperty: "text" } as any);
    }, ValidationError);
  });
});

@Validate()
class TestMessageClass extends AbstractValidated {
  @NotEmptyString({ required: true, message: "{requiredProperty}" })
  public requiredProperty: string;

  constructor(entity: { requiredProperty: string, optionalProperty?: string }) {
    super(entity);
    this.requiredProperty = entity.requiredProperty;
  }
}

describe("Validate decorator message test", () => {
  it("Return raw error message when setMessages not called", () => {
    try {
      const test = new TestMessageClass({} as any);
    } catch (e) {
      if (e instanceof ValidationError) {
        assert.strictEqual(e.message, "{requiredProperty}");
      } else {
        throw e;
      }
    }
  });

  it("Return passed error message when call setMessages", () => {
    TestMessageClass.setMessages({ requiredProperty: "TEST MESSAGE" });
    try {
      const test = new TestMessageClass({} as any);
    } catch (e) {
      if (e instanceof ValidationError) {
        assert.strictEqual(e.message, "TEST MESSAGE");
      } else {
        throw e;
      }
    }
  });
});
