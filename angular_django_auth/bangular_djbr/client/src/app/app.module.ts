import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule }    from '@angular/common/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';

import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { ItalicsDirective } from './italics.directive';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookSearchComponent } from './book-search/book-search.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    ItalicsDirective,
    BookDetailComponent,
    MessagesComponent,
    DashboardComponent,
    BookSearchComponent,
    ReviewsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
