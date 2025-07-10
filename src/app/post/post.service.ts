import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiURL = "http://127.0.0.1:8000/posts";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  // GET /testes
  getAll(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.apiURL)
      .pipe(catchError(this.errorHandler));
  }

  // POST /testes
  create(post: Post): Observable<Post> {
    return this.httpClient.post<Post>(this.apiURL, JSON.stringify(post), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  // GET /testes/:id
  find(id: number): Observable<Post> {
    return this.httpClient.get<Post>(`${this.apiURL}/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  // PUT /testes/:id
  update(id: number, post: Post): Observable<Post> {
    return this.httpClient.put<Post>(`${this.apiURL}/${id}`, JSON.stringify(post), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  // DELETE /testes/:id
  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiURL}/${id}`, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  // Tratamento de erros
  errorHandler(error: any): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Erro ${error.status}: ${error.message}`;
    }
    return throwError(() => errorMessage);
  }

  
}
