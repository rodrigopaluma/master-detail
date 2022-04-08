import { Injectable, Injector } from '@angular/core';
import { Entry } from './entry.model';
import { CategoryService } from '../../categories/shared/category.service';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry> {

  constructor(protected injector: Injector, private categoryService: CategoryService) {
    super('api/entries', injector, Entry.fromJson);
  }

  // Cria uma Entrada
  create(entry: Entry): Observable<Entry> {
    // Atrelando obj Category ao obj Entry
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(category => {
        // Atrelou o obj Category ao obj Entry
        entry.category = category;
        // Chama o método create da classe BaseResourceService
        return super.create(entry);
      })
    );
  }

  // Atualiza uma Entrada
  update(entry: Entry): Observable<Entry> {
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(category => {
        entry.category = category;
        return super.update(entry);
      })
    );
  }

}
