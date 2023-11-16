export interface Field {
  name: string;
  error: string;
}

export interface ProblemDetail {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
  fields: Field[];
}
