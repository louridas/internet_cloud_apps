import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Review } from '../review';
import { ReviewService } from '../review.service';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
})
export class ReviewsComponent implements OnInit {

  reviews: Review[];

  review: Review;

  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    const bookId = +this.route.snapshot.paramMap.get('id');
    this.review = this.newReview(bookId);
    return this.reviewService.getReviews(bookId)
      .subscribe(reviews => this.reviews = reviews);
  }

  newReview(bookId: number) : Review {
    var review = new Review();
    review.book = bookId;
    review.title = '';
    review.text = '';
    review.review_date = new Date();
    return review;
  }

  onSubmit() : void {
    this.reviewService.addReview(this.review)
      .subscribe(review => {
        if (review) {
          this.reviews.unshift(review);
          this.review = this.newReview(review.book);
        }
      });
  }

}
