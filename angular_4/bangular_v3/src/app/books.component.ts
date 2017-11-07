import { Component, OnInit } from '@angular/core';

import { BookDetailComponent } from './book-detail.component';
import { BookService } from './book.service';

import { Book } from './book';

@Component({
  selector: 'my-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
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
