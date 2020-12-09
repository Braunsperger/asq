import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Asq2 } from '../shared/verifica.model';

@Injectable({
  providedIn: 'root'
})

export class VerificaService {

  asq: Asq2[];

  constructor(private http: HttpClient) { }

  search(asq: Asq2): Observable<Asq2[]> {
    return this.http.put('http://localhost/asq/backend/api/search', { data: asq })
      .pipe(map((res) => {
        this.asq = res['data'];
        return this.asq;
      }),
        catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);

    return throwError('Erro! Por favor contate o administrador do site.');
  }
}
