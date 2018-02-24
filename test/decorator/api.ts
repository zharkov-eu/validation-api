/*------------------------------------------------------------------------------
 - Licensed under the MIT License. See License.txt in the project root for license information.
 - @author Evgeni Zharkov <zharkov.ev.u@yandex.ru>
 -----------------------------------------------------------------------------*/

"use strict";

import "mocha";

import * as assert from "assert";
import {IsBoolean, Validate} from "../../src/decorator/api";
import {ValidationError} from "../../src/error";

describe("Validate test", () => {
  @Validate({throwable: false})
  class TestDomain {
    @IsBoolean()
    public booleanValue;

    constructor(entity: any) {
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
    assert.doesNotThrow(() => {
      try {
        const test = new TestDomainThrowable({booleanValue: 1});
      } catch (error) {
        if (!(error instanceof ValidationError)) {
          throw error;
        }
      }
    });
  });

  it("Construct object with invalid argument on throwable class doesn't throws error", () => {
    assert.doesNotThrow(() => {
      const test = new TestDomain({booleanValue: 1});
      assert.equal(test["__validationError"]().length === 1, true);
    });
  });

  it("Construct object with valid argument is successful", () => {
    assert.doesNotThrow(() => {
      const test = new TestDomainThrowable({booleanValue: false});
    });
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
    assert.doesNotThrow(() => {
      try {
        const test = new TestDomainThrowable({booleanValue: 1});
      } catch (error) {
        if (!(error instanceof ValidationError)) {
          throw error;
        }
      }
    });
  });

  it("Construct object with valid argument is successful", () => {
    assert.doesNotThrow(() => {
      const test = new TestDomainThrowable({booleanValue: false});
    });
  });
});
