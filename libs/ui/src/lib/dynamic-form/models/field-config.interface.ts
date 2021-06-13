import { ValidationErrors, ValidatorFn } from '@angular/forms';

export interface FieldConfig {
  disabled?: boolean,
  label?: string,
  name: string,
  subtype:string,
  options?: Array<{ key: string, value: string | number }>,
  placeholder?: string,
  type: string,
  validation?: ValidatorFn[],
  value?: any,
  errorMessage?: (errors: ValidationErrors | null) => string;
  valueChanges?: (val: any) => void;
}
