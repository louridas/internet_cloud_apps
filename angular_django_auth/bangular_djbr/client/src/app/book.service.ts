import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { ErrorHandlingService } from './errorhandling.service';

import { Book } from './book';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class BookService {

  private booksUrl = 'api/books';

  constructor(
    private http: HttpClient,
    private message: MessageService,
    private eh: ErrorHandlingService
  ) { }

  /** GET books from the server */
  getBooks(): Observable<Book[]> {
   return this.http.get<Book[]>(this.booksUrl)
     .pipe(
       tap(books => this.message.add(`fetched books`)),
       catchError(this.eh.handleError('getBooks', []))
     );
  }

  /** GET book by id. Will 404 if id not found */
  getBook(id: number): Observable<Book> {
    const url = `${this.booksUrl}/${id}`;
    return this.http.get<Book>(url).pipe(
      tap(_ => this.message.add(`fetched book id=${id}`)),
      catchError(this.eh.handleError<Book>(`getBook id=${id}`))
    );
  }

  /** PUT: update the book on the server */
  updateBook (book: Book): Observable<any> {
    return this.http.put(this.booksUrl, book, httpOptions).pipe(
      tap(_ => this.message.add(`updated book id=${book.id}`)),
      catchError(this.eh.handleError<any>('updateBook'))
    );
  }

  /** POST: add a new book to the server */
  addBook (book: Book): Observable<Book> {
    return this.http.post<Book>(this.booksUrl, book, httpOptions).pipe(
      tap((book: Book) => this.message.add(`added book w/ id=${book.id}`)),
      catchError(this.eh.handleError<Book>('addBook'))
    );
  }

  /** DELETE: delete the book from the server */
  deleteBook (book: Book | number): Observable<Book> {
    const id = typeof book === 'number' ? book : book.id;
    const url = `${this.booksUrl}/${id}`;

    return this.http.delete<Book>(url, httpOptions).pipe(
      tap(_ => this.message.add(`deleted book id=${id}`)),
      catchError(this.eh.handleError<Book>('deleteBook'))
    );
  }

  /* GET books whose title contains search term */
  searchBooks(term: string): Observable<Book[]> {
    if (!term.trim()) {
      // if not search term, return empty book array.
      return of([]);
    }
    return this.http.get<Book[]>(`api/books/?title=${term}`).pipe(
      tap(_ => this.message.add(`found books matching "${term}"`)),
      catchError(this.eh.handleError<Book[]>('searchBooks', []))
    );
  }

}
