import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClerkService } from './services/clerk.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private readonly clerkService = inject(ClerkService);

  title = 'habit-tracker';

  ngOnInit(): void {
    this.clerkService.initialize();
  }
}
