import { Component, OnInit } from '@angular/core';

import { Book } from './book';
import { BookService } from './book.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  books: Book[] = [];

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.getBooks()
      .then(books => this.books = books.slice(0, 4));
  }

  gotoDetail(book: Book): void { /* TODO */ }

}
