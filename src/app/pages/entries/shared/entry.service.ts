import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';

import  { Entry } from './entry.model';
import { CategoryService } from '../../categories/shared/category.service.ts.service';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private apiPath: string = 'api/entries';

  constructor(private http: HttpClient,
              private categoryService: CategoryService) { }

  // Lista todas as Entradas
  getAll(): Observable<Entry[]> {
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntries)
    );
  }

  // Pega uma Entrada pelo ID
  getById(id: number): Observable<Entry> {
    const url = `${this.apiPath}/${id}`;

    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntry)
    );
  }

  // Cria uma Entrada
  create(entry: Entry): Observable<Entry> {
    // Atrelando obj Category ao obj Entry
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(category => {
        entry.category = category; // Atrelou o obj Category ao obj Entry

        return this.http.post(this.apiPath, entry).pipe(
          catchError(this.handleError),
          map(this.jsonDataToEntry)
        );
      })
    );
  }

  // Atualiza uma Entrada
  update(entry: Entry): Observable<Entry> {
    const url = `${this.apiPath}/${entry.id}`;

    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(category => {
        entry.category = category;

        return this.http.put(url, entry).pipe(
          catchError(this.handleError),
          map(() => entry)
        )
      })
    );
  }

  // Deleta uma Entrada
  delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;

    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }

  // MÉTODOS PRIVADOS
  private jsonDataToEntries(jsonData: any[]): Entry[] {
    const entries: Entry[] = [];

    jsonData.forEach(element => {
      const entry = Object.assign(new Entry(), element);
      entries.push(entry);
    });

    return entries;
  }

  private jsonDataToEntry(jsonData: any): Entry {
    return Object.assign(new Entry(), jsonData);
  }

  private handleError(error: any): Observable<any> {
    console.log('Erro na requisição => ', error);
    return throwError(error);
  }

}
