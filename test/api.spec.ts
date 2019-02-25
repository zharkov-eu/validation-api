/*
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * @author Evgeni Zharkov <zharkov.ev.u@yandex.ru>
 */

"use strict";

import { assert } from "chai";
import { describe, it } from "mocha";
import { AbstractValidated, IsBoolean, IsMemberOf, IsPositiveNumber, Validate, ValidationError } from "..";

describe("IsBoolean test", () => {
  @Validate()
  class TestDomain extends AbstractValidated {
    @IsBoolean()
    public booleanValue;

    constructor(entity: any) {
      super(entity);
      this.booleanValue = entity.booleanValue;
    }
  }

  it("Construct object with invalid argument throws error", () => {
    assert.throws(() => new TestDomain({ booleanValue: 1 }), ValidationError);
  });

  it("Construct object with valid argument is successful", () => {
    assert.doesNotThrow(() => new TestDomain({ booleanValue: false }));
  });
});

describe("Positive number test", () => {
  @Validate()
  class TestDomain extends AbstractValidated {
    @IsPositiveNumber()
    public positiveNumber;

    constructor(entity: any) {
      super(entity);
      this.positiveNumber = entity.positiveNumber;
    }
  }

  it("Construct object with invalid argument throws error", () => {
    assert.throws(() => new TestDomain({ positiveNumber: -1 }), ValidationError);
  });

  it("Construct object with valid argument is successful", () => {
    assert.doesNotThrow(() => new TestDomain({ positiveNumber: 1 }));
  });
});

describe("IsMemberOf test", () => {
  @Validate()
  class TestDomain extends AbstractValidated {
    @IsMemberOf({ array: ["ab", "ac", "ad"] })
    public memberValue;

    constructor(entity: any) {
      super(entity);
      this.memberValue = entity.memberValue;
    }
  }

  it("Construct object with invalid argument throws error", () => {
    assert.throws(() => new TestDomain({ memberValue: "ba" }), ValidationError);
  });

  it("Construct object with valid argument is successful", () => {
    assert.doesNotThrow(() => new TestDomain({ memberValue: "ac" }));
  });
});
