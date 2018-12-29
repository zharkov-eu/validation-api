/*
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * @author Evgeni Zharkov <zharkov.ev.u@yandex.ru>
 */

"use strict";

import { Constraint } from "./decorator/api";
import { ValidationError } from "./error";

export abstract class AbstractValidated {
  protected constructor(entity: any) {
    if (typeof entity !== "object") {
      throw new ValidationError([{
        constraint: Constraint.IsPresented,
        message: "No entity presented",
        property: "",
        value: "",
      }]);
    }
  }
}
