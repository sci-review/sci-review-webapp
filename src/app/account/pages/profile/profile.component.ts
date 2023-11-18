import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from "../../../common/components/page-header/page-header.component";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { BaseComponent } from "../../../common/components/base/base.component";
import { UserService } from "../../services/user.service";
import { User } from "../../models/user.model";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent extends BaseComponent {
  userService = inject(UserService);
  user: User | undefined;

  ngOnInit() {
    this.appStoreService.setLoading(true);
    this.userService.getProfile().subscribe({
      next: (user) => {
        this.appStoreService.setLoading(false);
        this.user = user;
      },
      error: (error) => {
        this.appStoreService.setLoading(false);
        console.log(error);
      }
    });
  }
}
