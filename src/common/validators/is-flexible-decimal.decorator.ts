import { ValidateBy, ValidationOptions, buildMessage, isDecimal } from 'class-validator';

export const IS_FLEXIBLE_DECIMAL = 'isFlexibleDecimal';

// @IsDecimal gốc chỉ chấp nhận string, còn @Min/@Max lại chỉ chấp nhận number
// -> cặp validator do generator sinh ra cho field Decimal bị mâu thuẫn.
// Validator này chấp nhận CẢ number lẫn numeric-string nên luôn khớp với @Min/@Max.
function isValidFlexibleDecimal(value: unknown): boolean {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (typeof value === 'string') {
    return isDecimal(value, { decimal_digits: '1,', locale: 'en-US' });
  }
  return false;
}

export function IsFlexibleDecimal(validationOptions?: ValidationOptions): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_FLEXIBLE_DECIMAL,
      validator: {
        validate: (value): boolean => isValidFlexibleDecimal(value),
        defaultMessage: buildMessage((eachPrefix) => `${eachPrefix}$property phải là số thập phân hợp lệ`, validationOptions),
      },
    },
    validationOptions,
  );
}
