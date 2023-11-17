import { inject, Injectable } from '@angular/core';
import { BaseService } from "../../common/services/base.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { Review, ReviewForm } from "../models/review.model";

@Injectable({
  providedIn: 'root'
})
export class ReviewService extends BaseService {
  http = inject(HttpClient);
  apiUrl = environment.apiUrl + '/reviews';

  constructor() {
    super();
  }

  new(reviewForm: ReviewForm): Observable<Review> {
    return this.http.post<Review>(this.apiUrl, reviewForm, this.httpOptions);
  }

  list(): Observable<Review[]> {
    return this.http.get<Review[]>(this.apiUrl, this.httpOptions);
  }

  show(reviewId: string): Observable<Review> {
    return this.http.get<Review>(this.apiUrl + '/' + reviewId, this.httpOptions);
  }
}
