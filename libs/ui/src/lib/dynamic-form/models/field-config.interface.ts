import {ValidatorFn} from '@angular/forms';

export interface FieldConfig {
  disabled?: boolean,
  label?: string,
  name: string,
  subtype:string,
  options?: Array<{ key: string, value: string | number }>,
  placeholder?: string,
  type: string,
  validation?: ValidatorFn[],
  value?: any
}
