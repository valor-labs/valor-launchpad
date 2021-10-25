import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

/**
 * returns true if it has xor relation with the specified key in the constraint
 *
 * ### Usage example
 * phone and email is required at least one and only one
 *
 * ```
 * import { Validate } from 'class-validator';
 *
 * class SomeDTO {
 *   @Validate(Xor, ['phone'])
 *   email: string;
 *
 *   @Validate(Xor, ['email'])
 *   phone: string;
 * }
 * ```
 */
@ValidatorConstraint({ name: 'xor', async: false })
export class Xor implements ValidatorConstraintInterface {
  validate(propertyValue: string, args: ValidationArguments) {
    return (
      (!!propertyValue && !args.object[args.constraints[0]]) ||
      (!propertyValue && !!args.object[args.constraints[0]])
    );
  }

  defaultMessage(args: ValidationArguments) {
    return `Failed XOR relation between "${args.property}" and "${args.constraints[0]}".`;
  }
}
