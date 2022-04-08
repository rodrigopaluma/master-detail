import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [ // Modulos Compartilhados
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
