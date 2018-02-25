# validation-api
TypeScript Validation Api, based on decorators. 


## Usage

```typescript
import {Validate, ValidationError, IsBoolean} from "validation-api";

@Validate()
class TestDomain {
    @IsBoolean()
    public booleanValue;
    
    constructor(entity: any) {
      this.booleanValue = entity.booleanValue;
    }
}

try {
    const success = new TestDomain({booleanValue: false})
    const fail = new TestDomain({booleanValue: 1});
} catch (error) {
    if (error instanceof ValidationError) {
        console.error(error.cause)
    } else {
        throw error
    }
}
```

### Class decorator

```typescript
@Validate(option = {throwable: true})
```

If throwable is true throws ValidationError with array of cause on construct,
else if throwable is false client code can get error cause array by calling "__validationError" method of object

Example

```typescript
import {Validate, ValidationDomain, IsBoolean} from "validation-api";

@Validate({throwable: false})
class TestDomain extends ValidationDomain {
    @IsBoolean()
    public booleanValue;
    
    constructor(entity: any) {
      this.booleanValue = entity.booleanValue;
    }
}

const fail = new TestDomain({booleanValue: 1});
console.error(fail.__validationError())
```

### Property decorator

* NotEmpty
* NotEmptyString
* IsBoolean
* IsNumber
* IsPositiveNumber
* IsPositiveOrZeroNumber
