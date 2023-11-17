import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from "../services/auth.service";

@Directive({
  selector: '[appIsAdmin]',
  standalone: true
})
export class IsAdminDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {
    if (this.authService.userIsAdmin()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

}
