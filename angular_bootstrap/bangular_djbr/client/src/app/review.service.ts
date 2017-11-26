import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';

import { Review } from './review';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ReviewService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  /** GET reviews from the server */
  getReviews(bookId: number): Observable<Review[]> {
    let url = `api/books/${bookId}/reviews`;
    return this.http.get<Review[]>(url)
      .pipe(
        tap(reviews => this.log(`fetched reviews`)),
        catchError(this.handleError('getReviews', []))
      );
  }

  /** POST: add a new review to the server */
  addReview(review: Review): Observable<Review> {
    let url = `api/books/${review.book}/reviews`;
    return this.http.post<Review>(url, review, httpOptions).pipe(
      tap((review: Review) => this.log(`added review w/ id=${review.id}`)),
      catchError(this.handleError<Review>('addReview'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string): void {
    this.messageService.add('ReviewService: ' + message);
  }

}
