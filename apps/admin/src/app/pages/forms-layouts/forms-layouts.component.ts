import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'valor-launchpad-forms-layouts',
  templateUrl: './forms-layouts.component.html',
  styleUrls: ['./forms-layouts.component.scss']
})
export class FormsLayoutsComponent implements OnInit {

  basicFormGroup: FormGroup;
  horizontalFormGroup: FormGroup;
  rowFormGroup: FormGroup;
  inlineFormGroup: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.basicFormGroup = this.fb.group({
      email: [],
      password: [],
      textarea: [],
      files: [],
      checked: [],
    });
    this.horizontalFormGroup = this.fb.group({
      email: [],
      password: [],
      textarea: [],
      radio: [],
      checked: [],
    });
    this.rowFormGroup = this.fb.group({
      email: [],
      password: [],
      address: [],
      address2: [],
      city: [],
      state: [],
      zip: [],
      checked: [],
    });
    this.inlineFormGroup = this.fb.group({
      name: [],
      username: [],
      remembered: [],
    });
  }

  submitBasicForm() {
    if (this.basicFormGroup.valid) {
      console.log(this.basicFormGroup.value);
    }
  }

}
