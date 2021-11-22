import { AutocompleteContentDirective } from './autocomplete-content.directive';
import { TemplateRef } from '@angular/core';

describe('AutocompleteContentDirective', () => {
  let templateRef: createSpyObj<TemplateRef<any>>;
  it('should create an instance', () => {
    const directive = new AutocompleteContentDirective();
    expect(directive).toBeTruthy();
  });
});


export const createSpyObj = (baseName, methodNames): { [key: string]: jest.Mock<any> } => {
  const obj: any = {};

  for (let i = 0; i < methodNames.length; i++) {
    obj[methodNames[i]] = jest.fn();
  }

  return obj;
};
