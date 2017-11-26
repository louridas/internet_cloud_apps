import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';

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
  hideSearchingWhenUnsubscribed =
    new Observable(() => () => this.searching = false);

  public books$: Observable<Book[]>;

  constructor(
    private router: Router,
    private bookService: BookService
  ) { }

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(300)
      .distinctUntilChanged()
      .do(() => this.searching = true)
      .switchMap(term =>
        this.bookService.searchBooks(term)
          .do(() => this.searchFailed = false)
          .catch(() => {
            console.log('Failed!');
            this.searchFailed = true;
            return Observable.of([]);
          }))
      .do(() => {this.searching = false;} )
      .merge(this.hideSearchingWhenUnsubscribed);

  formatter = (b: Book) => b.title;

  selectedItem(item) {
    var book = item.item;
    this.router.navigate([`/book/${book.id}`]);
  }

}
