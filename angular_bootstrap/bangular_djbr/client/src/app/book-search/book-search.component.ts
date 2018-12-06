import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap, tap, catchError
 } from 'rxjs/operators';

import { Book } from '../book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: [ './book-search.component.css' ]
})
export class BookSearchComponent {
  public model: any;
  searching = false;
  searchFailed = false;

  public books$: Observable<Book[]>;

  constructor(private router: Router,
              private bookService: BookService) {
    this.search = this.search.bind(this);

  }

  // Push a search term into the observable stream.
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
                this.bookService.searchBooks(term).pipe(
                  tap(() => this.searchFailed = false),
                  catchError(() => {
                    console.log('Failed!');
                    this.searchFailed = true;
                    return of([]);
                  }))
               ),
      tap(() => {this.searching = false;})
    )

  formatter(b: Book) : string {
    return b.title;
  }

  selectedItem(event) : void {
    var book = event.item;
    this.router.navigate([`/books/${book.id}`]);
  }

}
