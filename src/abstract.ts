/*
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * @author Evgeni Zharkov <zharkov.ev.u@yandex.ru>
 */

"use strict";

import { AbstractValidated as Reference, TMessages } from "../index";
import { Constraint } from "./api";
import { ValidationError } from "./error";

export abstract class AbstractValidated implements Reference {
  public static setMessages(messages: TMessages) {
    this.messages = messages;
  }

  private static messages: TMessages;

  protected constructor(entity: any) {
    if (typeof entity !== "object" || !entity) {
      throw new ValidationError([{ constraint: Constraint.IsPresented, message: "{IsPresented}" }]);
    }
  }
}
