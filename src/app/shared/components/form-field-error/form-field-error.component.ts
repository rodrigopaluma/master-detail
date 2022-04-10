import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field-error',
  template: `
    <p class="text-danger">
      {{errorMessage}}
    </p>
  `,
  styleUrls: ['./form-field-error.component.scss']
})
export class FormFieldErrorComponent implements OnInit {

  @Input('form-control') formControl: FormControl;

  constructor() { }

  ngOnInit() {
  }

  public get errorMessage(): string | null {
    if(this.mustShowErrorMessage())
      return this.getErrorMessage();
    else
      return null
  }

  private mustShowErrorMessage(): boolean {
    return this.formControl.invalid && this.formControl.touched
  }

  private getErrorMessage(): string | null {
    if(this.formControl.errors.required)
      return 'Dado obrigatório';

    else if(this.formControl.errors.email)
      return 'Formato de email inválido';

    else if(this.formControl.errors.minlength)
      return `Deve ter no mínimo ${this.formControl.errors.minlength.requiredLength} caracteres`;

    else if(this.formControl.errors.maxlength)
      return `Deve ter no máximo ${this.formControl.errors.maxlength.requiredLength} caracteres`;

    else if(this.formControl.errors.min)
      return `Deve ser maior que ${this.formControl.errors.min.min}`;

    else if(this.formControl.errors.max)
      return `Deve ser menor que ${this.formControl.errors.max.max}`;

    else if(this.formControl.errors.pattern)
      return 'Formato inválido';

    return null;
  }

}
