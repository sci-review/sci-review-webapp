import { ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AsyncPipe, NgIf } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { AppStoreService } from "../../../account/services/app-store.service";
import { AuthService } from "../../../account/services/auth.service";
import { IsAdminDirective } from "../../../account/directives/is-admin.directive";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    NgIf,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatProgressBarModule,
    IsAdminDirective,
    IsAdminDirective
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {
  appStore = inject(AppStoreService)
  authService = inject(AuthService);
  router = inject(Router);
  breakpointObserver = inject(BreakpointObserver);
  @ViewChild('drawer') drawer!: MatSidenav

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  closeDrawer() {
    if (this.drawer.mode == 'over') {
      this.drawer.close();
    }
  }
}
