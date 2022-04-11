import { Injectable, Injector } from '@angular/core';
import { Entry } from './entry.model';
import { CategoryService } from '../../categories/shared/category.service';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { Observable } from 'rxjs';
import { catchError, flatMap, map } from 'rxjs/operators';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry> {

  constructor(protected injector: Injector, private categoryService: CategoryService) {
    super('api/entries', injector, Entry.fromJson);
  }

  // Cria uma Entrada
  create(entry: Entry): Observable<Entry> {
    return this.setCategoryAndSendToServer(entry, super.create.bind(this));
  }

  // Atualiza uma Entrada
  update(entry: Entry): Observable<Entry> {
    return this.setCategoryAndSendToServer(entry, super.update.bind(this));
  }

  // Verifica a Categoria e envia ao servidor
  private setCategoryAndSendToServer(entry: Entry, sendFn: any): Observable<Entry>{
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(category => {
        entry.category = category; // Atrelou o obj Category ao obj Entry
        return sendFn(entry); // Chama o método create da classe BaseResourceService
      }),
      catchError(this.handleError)
    );
  }

  // Geração de Relatório
  public getByMonthAndYear(month: number, year: number): Observable<Entry[]> {
    return this.getAll().pipe(
      map(entries => this.filterByMonthAndYear(entries, month, year))
    );
  }

  // Filtro por Mês e Ano
  private filterByMonthAndYear(entries: Entry[], month: number, year: number): Entry[] {
    return entries.filter(entry => {
      const entryDate = moment(entry.date, 'DD/MM/YYYY');
      const monthMatches = entryDate.month() + 1 == month;
      const yearMatches = entryDate.year() == year;

      if (monthMatches && yearMatches)
        return entry;
    });
  }

}
