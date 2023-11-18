import { inject } from "@angular/core";
import { AppStoreService } from "../../../account/services/app-store.service";
import { Router } from "@angular/router";

export class BaseComponent {
  appStoreService = inject(AppStoreService);
  router = inject(Router);
}
