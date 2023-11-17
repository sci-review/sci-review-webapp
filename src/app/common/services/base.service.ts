import { HttpHeaders } from "@angular/common/http";

export class BaseService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  httpOptionsSkipInterceptor = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Skip-Interceptor': ''
    })
  };
}
