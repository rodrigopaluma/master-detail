import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntryListComponent } from './entrry-list/entry-list.component';

const routes: Routes = [
  {path: '', component: EntryListComponent}
  //{path: 'new', component: EntryFormComponent},
  //{path: ':id/edit', component: EntryFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntriesRoutingModule { }
