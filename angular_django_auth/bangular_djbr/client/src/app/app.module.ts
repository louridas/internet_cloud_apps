import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule }    from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';

import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { ItalicsDirective } from './italics.directive';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookService } from './book.service';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';
import { ErrorHandlingService } from './errorhandling.service';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookSearchComponent } from './book-search/book-search.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ReviewService } from './review.service';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';

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
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule.forRoot(),
  ],
  providers: [
    BookService,
    MessageService,
    ErrorHandlingService,
    ReviewService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
