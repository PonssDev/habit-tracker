import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClerkService } from '../../services/clerk.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class DashboardComponent implements OnInit {
  private readonly clerkService = inject(ClerkService);
  private readonly router = inject(Router);

  userName = '';

  ngOnInit(): void {
    this.clerkService.initialize().then(() => {
      const user = this.clerkService.user();
      if (user) {
        this.userName = user.firstName ?? user.username ?? '';
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  async signOut(): Promise<void> {
    await this.clerkService.signOut();
    this.router.navigate(['/login']);
  }
}