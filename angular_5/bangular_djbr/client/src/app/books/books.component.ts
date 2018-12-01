import { Component, OnInit } from '@angular/core';

import { Book } from '../book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books : Book[];

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getBooks()
      .subscribe(books => this.books = books);
  }

  add(title: string, url: String, pubYearStr: string): void {
    title = title.trim();
    url = url.trim();
    let pub_year = +pubYearStr;
    if (!title || !pub_year) { return; }
    this.bookService.addBook({ title, url, pub_year } as Book)
      .subscribe(book => {
        // If the operation has failed, BookService's handleError()
        // will have given an empty result; so we add to the
        // books array only if a non-empty result has been produced.
        if (book) { 
          this.books.push(book);
        }
      });
  }

  delete(book: Book): void {
    this.books = this.books.filter(h => h !== book);
    this.bookService.deleteBook(book).subscribe();
  }
  
}
