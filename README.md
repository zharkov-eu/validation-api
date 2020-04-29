# validation-api

TypeScript Validation Api, based on decorators.

## Usage

```typescript
import { Validate, ValidationError, IsBoolean } from 'validation-api';

@Validate()
class TestDomain {
  @IsBoolean()
  public booleanValue: boolean;

  constructor(entity: any) {
    this.booleanValue = entity.booleanValue;
  }
}

try {
  const success = new TestDomain({ booleanValue: false });
  const fail = new TestDomain({ booleanValue: 1 });
} catch (error) {
  if (error instanceof ValidationError) console.error(JSON.stringify(error));
  else throw error;
}
```

### Property decorator

All decorator methods can take argument relevant to interface IPropDecoratorOption

```typescript
interface IPropDecoratorOption {
  group?: string[];
  message?: string;
}
```

> Decorators IsNumber, IsPositiveNumber, IsPositiveOrZeroNumber can take extended options

```typescript
interface INumberPropDecorationOption extends IPropDecoratorOption {
  min?: number;
  max?: number;
}
```

> Decorator IsMemberOf gets array of possible values

```typescript
export interface IMemberOfPropDecorationOption extends IPropDecoratorOption {
  array: any[];
}
```

##### Decorators

- Required
- IsArray
- IsBoolean
- IsEmail
- IsMemberOf
- IsNumber
- IsPhone
- IsPositiveNumber
- IsPositiveOrZeroNumber
- IsString
- NotEmpty
- NotEmptyString

### Abstract class

### Complex validation

```typescript
import {
  AbstractValidated,
  Validate,
  ValidationError,
  Required,
  IsBoolean,
  NotEmpty,
  IsPositiveNumber,
  NotEmptyString,
} from 'validation-api';

@Validate()
class Person extends AbstractValidated {
  @Required()
  @NotEmptyString({ message: 'Name is required for person' })
  public name: string;

  @IsPositiveNumber({ message: 'Person age must be a positive number' })
  public age: number;

  @IsBoolean()
  public ready: boolean;

  constructor(entity: any) {
    super(entity);
    this.name = entity.name;
    if (entity.age) {
      this.age = entity.age;
    } // If because setting to undefined throws a Validation error is not presented
    if (entity.ready) {
      this.ready = entity.ready;
    } // See above
  }
}

try {
  const success = new Person({ name: 'Ivan', age: 24, ready: true });
  const fail = new Person({ name: '', age: 0, ready: 1 });
} catch (error) {
  if (error instanceof ValidationError) {
    console.error(error.cause);
  } else {
    throw error;
  }
}
```

This example provides output in stderr:

```javascript
[
  {
    constraint: 'NotEmptyString',
    message: 'Name is required for person',
    property: 'name',
    value: '',
  },
  {
    constraint: 'IsPositiveNumber',
    message: 'Person age must be a positive number',
    property: 'age',
    value: 0,
  },
  { constraint: 'IsBoolean', message: 'ready is not a Boolean', property: 'ready', value: 1 },
];
```
