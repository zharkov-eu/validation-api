import { assert } from 'chai';
import { describe, it } from 'mocha';
import {
  AbstractValidated,
  NotEmptyString,
  Required,
  TMessages,
  Validate,
  ValidationError,
} from '.';

@Validate()
class TestClass extends AbstractValidated {
  @Required()
  @NotEmptyString()
  public requiredProperty: string;
  @NotEmptyString()
  public optionalProperty?: string;

  constructor(entity: Record<string, unknown>) {
    super(entity);
    this.requiredProperty = entity.requiredProperty as string;
    this.optionalProperty = entity.optionalProperty as string;
  }
}

describe('Validate decorator test', () => {
  it('Successful construct class with all arguments', () => {
    assert.doesNotThrow(
      () => new TestClass({ requiredProperty: 'some', optionalProperty: 'next' }),
    );
  });

  it('Successful construct class without optional property arguments', () => {
    assert.doesNotThrow(() => new TestClass({ requiredProperty: 'some' }));
  });

  it('Throw error when required property not presented', () => {
    assert.throws(() => new TestClass({ optionalProperty: 'text' }), ValidationError);
  });

  it('Has only enumerable properties', () => {
    let test: TestClass;
    assert.doesNotThrow(
      () => (test = new TestClass({ requiredProperty: 'some', optionalProperty: 'next' })),
    );
    assert.strictEqual(test.requiredProperty, 'some');
    assert.strictEqual(test.optionalProperty, 'next');

    const keys = Object.keys(test);
    assert.strictEqual(keys.length, 2);
    assert.isTrue(keys.indexOf('requiredProperty') !== -1);
    assert.isTrue(keys.indexOf('optionalProperty') !== -1);
  });
});

@Validate()
class TestMessageClass extends AbstractValidated {
  @Required({ message: '{requiredProperty}' })
  @NotEmptyString({ message: '{requiredProperty}' })
  public requiredProperty: string;

  constructor(entity: Record<string, unknown>, messages?: TMessages) {
    super(entity, messages);
    this.requiredProperty = entity.requiredProperty as string;
  }
}

describe('Validate decorator message test', () => {
  it('TestMessageClass throws error', () => {
    assert.throws(() => new TestMessageClass({}));
  });

  it('Return raw error message when setMessages not called', () => {
    try {
      new TestMessageClass({});
    } catch (e) {
      if (e instanceof ValidationError) assert.strictEqual(e.message, '{requiredProperty}');
      else throw e;
    }
  });

  it('Return passed error message when messages passed from constructor', () => {
    try {
      new TestMessageClass({}, { requiredProperty: 'TEST MESSAGE' });
    } catch (e) {
      if (e instanceof ValidationError) assert.strictEqual(e.message, 'TEST MESSAGE');
      else throw e;
    }
  });

  it('Return passed error message when call setMessages', () => {
    TestMessageClass.setMessages({ requiredProperty: 'TEST MESSAGE' });
    try {
      new TestMessageClass({});
    } catch (e) {
      if (e instanceof ValidationError) assert.strictEqual(e.message, 'TEST MESSAGE');
      else throw e;
    }
  });
});

describe('Validate decorator group test', () => {
  class GroupClass extends AbstractValidated {
    @Required({ group: ['create'] })
    @NotEmptyString()
    public requiredProperty: string;
    @NotEmptyString()
    public optionalProperty?: string;

    constructor(entity: Record<string, unknown>) {
      super(entity);
      this.requiredProperty = entity.requiredProperty as string;
      this.optionalProperty = entity.optionalProperty as string;
    }
  }

  it('Throws error when validation group match', () => {
    @Validate({ group: 'create' })
    class CreateGroupClass extends GroupClass {}

    assert.throws(() => new CreateGroupClass({ optionalProperty: 'string' }), ValidationError);
  });

  it('Does not throw error when validation group not match', () => {
    @Validate({ group: 'update' })
    class UpdateGroupClass extends GroupClass {}

    assert.doesNotThrow(() => new UpdateGroupClass({ optionalProperty: 'string' }));
  });
});
