import moment from "moment/moment";

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
  startDate: moment.Moment;
  endDate: moment.Moment;
  archived: boolean;
  created_at: string;
  updated_at: string;
  reviewers: Reviewer[];
  investigations: Investigation[];
}

export interface ReviewerResponse {
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
  investigations: Investigation[];
}

export interface InvestigationForm {
  question: string;
}


export interface Investigation {
  id: string;
  userId: string;
  reviewId: string;
  question: string;
  status: InvestigationStatus;
  createdAt: Date;
  updatedAt: Date;
}


export enum InvestigationStatus {
  InProgress = "InProgress",
  Proceed = "Proceed",
  DoNotProceed = "DoNotProceed",
  Cancelled = "Cancelled",
}

export interface KeywordForm {
  word: string;
  synonyms: string[];
}

export interface InvestigationKeyword {
  id: string;
  userId: string;
  investigationId: string;
  word: string;
  synonyms: string[];
  createdAt: Date;
  updatedAt: Date;
}
