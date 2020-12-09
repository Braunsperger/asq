import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Asq } from '../shared/proced.model';

@Injectable({
  providedIn: 'root'
})

export class ProcedService {
  asq: Asq[];

  constructor(private http: HttpClient) { }

  get(): Observable<Asq[]> {
    return this.http.get('http://localhost/asq/backend/api/list').pipe(
      map((res) => {
        this.asq = res['data'];
        return this.asq;
      }),
      catchError(this.handleError));
  }

  store(asq: Asq): Observable<Asq[]> {
    return this.http.post(`http://localhost/asq/backend/api/store`, { data: asq })
      .pipe(map((res) => {
        this.asq.push(res['data']);
        return this.asq;
      }),
      catchError(this.handleError));
  }

  update(asq: Asq): Observable<Asq[]> {
    return this.http.put(`http://localhost/asq/backend/api/update`, { data: asq })
      .pipe(map((res) => {
        const asqres = this.asq.find((item) => {
          return +item['id'] === +asq['id'];
        });
        if (asqres) {
          asqres['codproc'] = asq['codproc'];
          asqres['idade'] = asq['idade'];
          asqres['sexo'] = asq['sexo'];
          asqres['perm'] = asq['perm'];
        }
        return this.asq;
      }),
        catchError(this.handleError));
  }

  delete(id: number): Observable<Asq[]> {
    const params = new HttpParams().set('id', id.toString());

    return this.http.delete(`http://localhost/asq/backend/api/delete`, { params: params })
      .pipe(map(res => {
        const filtered = this.asq.filter((asq) => {
          return +asq['id'] !== +id;
        });
        return this.asq = filtered;
      }),
        catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);

    return throwError('Erro! Por favor contate o administrador do site.');
  }
}
