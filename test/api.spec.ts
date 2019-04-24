/*
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * @author Evgeni Zharkov <zharkov.ev.u@yandex.ru>
 */

"use strict";

import { assert } from "chai";
import { describe, it } from "mocha";
import { AbstractValidated, IsBoolean, IsMemberOf, IsPhone, IsPositiveNumber, Validate, ValidationError } from "..";

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

describe("IsPhone test", () => {
  @Validate()
  class TestDomain extends AbstractValidated {
    @IsPhone()
    public phone;
    @IsPhone({ minlen: 11, maxlen: 11 })
    public phoneFixed;

    constructor(entity: any) {
      super(entity);
      this.phone = entity.phone;
      this.phoneFixed = entity.phoneFixed;
    }
  }

  it("Construct object with invalid argument throws error", () => {
    assert.throws(() => new TestDomain({ phone: "+1291acb" }), ValidationError);
  });

  it("Construct object with invalid argument throws error", () => {
    assert.throws(() => new TestDomain({ phoneFixed: "+7921219212" }));
  });

  it("Construct object with valid argument is successful", () => {
    assert.doesNotThrow(() => new TestDomain({ phone: "+7921219212" }));
  });

  it("Construct object with valid argument is successful", () => {
    assert.doesNotThrow(() => new TestDomain({ phoneFixed: "+79212192121" }));
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
