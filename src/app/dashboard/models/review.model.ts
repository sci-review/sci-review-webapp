export interface ReviewForm {
  title: string;
  type: ReviewType;
  startDate: string;
  endDate: string;
}

export enum ReviewerRole {
  ReviewerOwner = 'ReviewerOwner',
  ReviewerMember = 'ReviewerMember',
}

export interface Reviewer {
  id: string;
  userId: string;
  reviewId: string;
  active: boolean;
  role: ReviewerRole;
  created_at: string;
  updated_at: string;
}

export enum ReviewType {
  SystematicReview = 'SystematicReview',
  ScopingReview = 'ScopingReview',
  RapidReview = 'RapidReview',
}

export interface Review {
  id: string;
  ownerId: string;
  title: string;
  type: ReviewType;
  startDate: string;
  endDate: string;
  archived: boolean;
  created_at: string;
  updated_at: string;
  reviewers: Reviewer[];
}
