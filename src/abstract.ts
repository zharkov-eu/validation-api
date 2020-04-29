'use strict';

import { Constraint } from './api';
import { ValidationError } from './error';

export type TMessages = Record<string, string>;

export abstract class AbstractValidated {
  public static setMessages(messages: TMessages) {
    this.messages = messages;
  }

  private static messages: TMessages;

  protected constructor(entity: unknown, messages?: TMessages) {
    if (typeof entity !== 'object' || !entity) {
      throw new ValidationError([{ constraint: Constraint.IsPresented, message: '{IsPresented}' }]);
    }
  }
}
