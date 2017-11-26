import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';

import { Review } from '../review';
import { ReviewService } from '../review.service';

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
    private reviewService: ReviewService
  ) {
    this.review = this.newReview();
  }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        let bookId = +params.get('id');
        this.review = this.newReview();
        this.review.book = bookId;
        return this.reviewService.getReviews(+params.get('id'))
      }).subscribe(reviews => this.reviews = reviews);
  }

  get diagnostic() { return JSON.stringify(this.review); }

  newReview() : Review {
    var review = new Review();
    review.title = '';
    review.text = '';
    return review;
  }

  onSubmit() : void {
    console.log(this.review);
    this.reviewService.addReview(this.review)
      .subscribe(review => this.reviews.unshift(review));
  }

}
