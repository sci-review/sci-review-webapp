import { inject } from "@angular/core";
import { AppStoreService } from "../../../account/services/app-store.service";

export class BaseComponent {
  appStoreService = inject(AppStoreService);
}
