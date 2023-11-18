import { inject, Injectable, Signal, signal } from '@angular/core';
import { BaseService } from "../../common/services/base.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { Investigation, InvestigationForm, Review, ReviewForm } from "../models/review.model";

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

  newInvestigationQuestion(reviewId: string, investigationForm: InvestigationForm): Observable<Investigation> {
    return this.http.post<Investigation>(
      this.apiUrl + '/' + reviewId + '/investigations', investigationForm, this.httpOptions
    );
  }

  listInvestigations(reviewId: string): Observable<Investigation[]> {
    return this.http.get<Investigation[]>(this.apiUrl + '/' + reviewId + '/investigations', this.httpOptions);
  }

  getInvestigation(reviewId: string, investigationId: string) {
    return this.http.get<Investigation>(
      this.apiUrl + '/' + reviewId + '/investigations/' + investigationId, this.httpOptions
    );
  }
}
