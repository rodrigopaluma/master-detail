import { NgModule } from '@angular/core';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CategoriesRoutingModule,
    SharedModule
  ],
  declarations: [
    CategoryListComponent,
    CategoryFormComponent
  ]
})
export class CategoriesModule { }
