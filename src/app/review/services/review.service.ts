import { inject, Injectable, Signal, signal } from '@angular/core';
import { BaseService } from "../../common/services/base.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import {
  Investigation,
  InvestigationForm, InvestigationKeyword,
  KeywordForm,
  Review,
  ReviewerResponse,
  ReviewForm
} from "../models/review.model";
import { map } from "rxjs/operators";
import moment from 'moment/moment';

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
    return this.http.get<ReviewerResponse>(this.apiUrl + '/' + reviewId, this.httpOptions)
      .pipe(
        map((reviewResponse) => this.mapReviewResponseToReview(reviewResponse))
      );
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

  update(reviewId: string, reviewForm: ReviewForm): Observable<Review> {
    return this.http.put<Review>(this.apiUrl + '/' + reviewId, reviewForm, this.httpOptions);
  }

  newInvestigationKeyword(
    reviewId: string,
    investigationId: string,
    keyword: KeywordForm
  ): Observable<InvestigationKeyword> {
    const url = `${this.apiUrl}/${reviewId}/investigations/${investigationId}/keywords`;
    return this.http.post<InvestigationKeyword>(url, keyword, this.httpOptions);
  }

  listInvestigationKeywords(reviewId: string,investigationId: string,): Observable<InvestigationKeyword[]> {
    const url = `${this.apiUrl}/${reviewId}/investigations/${investigationId}/keywords`;
    return this.http.get<InvestigationKeyword[]>(url, this.httpOptions);
  }

  private mapReviewResponseToReview(reviewResponse: ReviewerResponse) {
    return {
      id: reviewResponse.id,
      ownerId: reviewResponse.ownerId,
      title: reviewResponse.title,
      type: reviewResponse.type,
      startDate: moment.utc(reviewResponse.startDate),
      endDate: moment.utc(reviewResponse.endDate),
      archived: reviewResponse.archived,
      created_at: reviewResponse.created_at,
      updated_at: reviewResponse.updated_at,
      reviewers: reviewResponse.reviewers,
      investigations: reviewResponse.investigations,
    }
  }
}
