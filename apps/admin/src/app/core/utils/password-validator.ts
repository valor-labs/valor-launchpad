export interface ValidationResult {
  [key: string]: boolean;
}

export const DefaultValidation: ValidationResult = {
  minLength: true,
  maxLength: true,
  number: true,
  uppercase: true,
  lowercase: true,
  characters: true,
};
