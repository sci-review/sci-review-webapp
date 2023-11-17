import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from "../../../common/components/navigation/navigation.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  standalone: true,
    imports: [CommonModule, NavigationComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
