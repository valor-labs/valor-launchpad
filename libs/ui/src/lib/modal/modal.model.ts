import type { ButtonComponent } from '../button/button.component';
export type ModalTheme = 'success' | 'warning' | 'danger' | 'primary';
export type ModalSize = 'sm' | 'lg' | 'md';

// footer button option
export type ModalButtonOption = Partial<Pick<ButtonComponent, 'theme' | 'size' | 'outlined' | 'rounded' | 'squared'>> & {
  label: string;
  onClick?: () => any;
}

export interface ModalOptions {
  heading?: string;
  content?: string;
  footer?: ModalButtonOption[];
  closableByIcon?: boolean;
  modalClass?: string;
  theme?: ModalTheme;
}
