import { Component, OnInit } from '@angular/core';

import { BookDetailComponent } from './book-detail.component';
import { BookService } from './book.service';

import { Book } from './book';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [BookService]
})
export class AppComponent implements OnInit {
  title = 'Bangular';
  books: Book[];
  selectedBook: Book;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
      this.getBooks();
  }

  onSelect(book: Book): void {
    this.selectedBook = book;
  }

  getBooks(): void {
    this.bookService.getBooks().then(books => this.books = books);
  }

}
