/*
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * @author Evgeni Zharkov <zharkov.ev.u@yandex.ru>
 */

"use strict";

import "mocha";

import * as assert from "assert";
import { IsBoolean, IsMemberOf, IsPositiveNumber, Validate, ValidationDomain } from "../../index";
import { Constraint } from "../../src/decorator/api";
import { ValidationError } from "../../src/error";

describe("Validate test", () => {
  @Validate({ throwable: false })
  class TestDomain extends ValidationDomain {
    @IsBoolean()
    public booleanValue;

    constructor(entity: any) {
      super();
      this.booleanValue = entity.booleanValue;
    }
  }

  @Validate()
  class TestDomainThrowable {
    @IsBoolean()
    public booleanValue;

    constructor(entity: any) {
      this.booleanValue = entity.booleanValue;
    }
  }

  it("Construct object with invalid argument on throwable class throws error", () => {
    assert.throws(() => new TestDomainThrowable({ booleanValue: 1 }), ValidationError);
  });

  it("Construct object with invalid argument on throwable class doesn't throws error", () => {
    assert.doesNotThrow(() => {
      const test = new TestDomain({ booleanValue: 1 });
      assert.strictEqual(test.__validationError().length, 1);
      assert.strictEqual(test.__validationError()[0].constraint, Constraint.IsBoolean);
    });
  });

  it("Construct object with valid argument is successful", () => {
    assert.doesNotThrow(() => new TestDomainThrowable({ booleanValue: false }));
  });
});

describe("IsBoolean test", () => {
  @Validate()
  class TestDomainThrowable {
    @IsBoolean()
    public booleanValue;

    constructor(entity: any) {
      this.booleanValue = entity.booleanValue;
    }
  }

  it("Construct object with invalid argument throws error", () => {
    assert.throws(() => new TestDomainThrowable({ booleanValue: 1 }), ValidationError);
  });

  it("Construct object with valid argument is successful", () => {
    assert.doesNotThrow(() => new TestDomainThrowable({ booleanValue: false }));
  });
});

describe("Positive number test", () => {
  @Validate()
  class TestDomainThrowable {
    @IsPositiveNumber()
    public positiveNumber;

    constructor(entity: any) {
      this.positiveNumber = entity.positiveNumber;
    }
  }

  it("Construct object with invalid argument throws error", () => {
    assert.throws(() => new TestDomainThrowable({ positiveNumber: -1 }), ValidationError);
  });

  it("Construct object with valid argument is successful", () => {
    assert.doesNotThrow(() => new TestDomainThrowable({ positiveNumber: 1 }));
  });
});

describe("IsMemberOf test", () => {

  @Validate()
  class TestDomainThrowable {
    @IsMemberOf({ array: ["ab", "ac", "ad"] })
    public memberValue;

    constructor(entity: any) {
      this.memberValue = entity.memberValue;
    }
  }

  it("Construct object with invalid argument throws error", () => {
    assert.throws(() => new TestDomainThrowable({ memberValue: "ba" }), ValidationError);
  });

  it("Construct object with valid argument is successful", () => {
    assert.doesNotThrow(() => new TestDomainThrowable({ memberValue: "ac" }));
  });
});
