import { Component, OnInit, inject } from '@angular/core';
import { ClerkService } from '../../services/clerk.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class LoginComponent implements OnInit {
  private readonly clerkService = inject(ClerkService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.clerkService.initialize().then(() => {
      if (this.clerkService.isSignedIn()) {
        this.router.navigate(['/']);
      }
    });
  }

  signIn(): void {
    this.clerkService.signIn();
  }

  signUp(): void {
    this.clerkService.signUp();
  }
}