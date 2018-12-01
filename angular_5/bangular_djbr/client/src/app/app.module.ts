import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule }    from '@angular/common/http';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { ItalicsDirective } from './italics.directive';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookSearchComponent } from './book-search/book-search.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    ItalicsDirective,
    BookDetailComponent,
    MessagesComponent,
    DashboardComponent,
    BookSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
