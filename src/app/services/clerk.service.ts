import { Injectable, Signal, computed, inject, signal } from '@angular/core';
import { Clerk } from '@clerk/clerk-js';
import type { UserResource as User } from '@clerk/types';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClerkService {
  private clerk: Clerk | null = null;
  private userSignal = signal<User | null>(null);

  user: Signal<User | null> = computed(() => this.userSignal());
  isSignedIn: Signal<boolean> = computed(() => !!this.userSignal());

  async initialize(): Promise<void> {
    if (this.clerk) {
      return;
    }

    const clerk = new Clerk(environment.clerkPublishableKey);
    await clerk.load();

    this.clerk = clerk;

    if (clerk.user) {
      this.userSignal.set(clerk.user);
    }

    clerk.addListener((event) => {
      if (event.user) {
        this.userSignal.set(event.user);
      } else {
        this.userSignal.set(null);
      }
    });
  }

  async signIn(): Promise<void> {
    if (!this.clerk) {
      throw new Error('Clerk no ha sido inicializado');
    }

    await this.clerk.openSignIn();
  }

  async signUp(): Promise<void> {
    if (!this.clerk) {
      throw new Error('Clerk no ha sido inicializado');
    }

    await this.clerk.openSignUp();
  }

  async signOut(): Promise<void> {
    if (!this.clerk) {
      throw new Error('Clerk no ha sido inicializado');
    }

    await this.clerk.signOut();
  }
}