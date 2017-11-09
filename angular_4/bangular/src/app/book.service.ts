import { Injectable } from '@angular/core';

import { MessageService } from './message.service';

import { Book } from './book';
import { BOOKS } from './mock-books';

@Injectable()
export class BookService {

  getBooks(): Promise<Book[]> {
    this.messageService.add('BookService: fetched books');
    return Promise.resolve(BOOKS);
  }

  getBook(id: number): Promise<Book> {
    this.messageService.add(`BookService: fetched book id=${id}`);
    return Promise.resolve(BOOKS.find(book => book.id === id));
  }

  constructor(private messageService: MessageService) { }

}
