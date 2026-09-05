import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-full bg-surface-bg p-4 sm:p-6 lg:p-8">
      <header class="mx-auto mb-6 max-w-5xl">
        <p class="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-primary">Account</p>
        <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Profile</h1>
        <p class="mt-2 max-w-2xl text-sm text-gray-500">
          View your account details and workspace access.
        </p>
      </header>

      <main class="mx-auto grid max-w-5xl gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section class="space-y-5">
          <article
            class="overflow-hidden rounded-xl border border-surface-border bg-surface-card shadow-sm"
          >
            <div class="h-28 bg-gradient-to-r from-primary to-[#7c5cfc]"></div>
            <div class="px-5 pb-6 sm:px-6">
              <div class="-mt-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div class="flex items-end gap-4">
                  <div
                    class="flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-surface-card bg-gradient-to-br from-primary to-[#7c5cfc] text-2xl font-bold text-white shadow-md"
                  >
                    {{ initials }}
                  </div>
                  <div class="pb-1">
                    <h2 class="text-xl font-bold text-gray-900">{{ name }}</h2>
                    <p class="mt-1 text-sm text-gray-500">{{ role }}</p>
                  </div>
                </div>
                <span class="badge badge-success self-start sm:self-auto">Active account</span>
              </div>
            </div>
          </article>

          <article
            class="rounded-xl border border-surface-border bg-surface-card p-5 shadow-sm sm:p-6"
          >
            <div class="mb-5 flex items-start gap-3">
              <div
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-muted text-primary"
              >
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                >
                  <circle cx="12" cy="7" r="4"></circle>
                  <path d="M5.5 21a6.5 6.5 0 0 1 13 0"></path>
                </svg>
              </div>
              <div>
                <h2 class="font-semibold text-gray-900">Personal information</h2>
                <p class="mt-1 text-sm text-gray-500">
                  Your account information used across the workspace.
                </p>
              </div>
            </div>

            <dl class="grid gap-x-6 gap-y-5 sm:grid-cols-2">
              <div>
                <dt class="text-xs font-medium uppercase tracking-wide text-gray-400">Full name</dt>
                <dd class="mt-1.5 text-sm font-medium text-gray-800">{{ name }}</dd>
              </div>
              <div>
                <dt class="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Email address
                </dt>
                <dd class="mt-1.5 break-all text-sm font-medium text-gray-800">{{ email }}</dd>
              </div>
              <div>
                <dt class="text-xs font-medium uppercase tracking-wide text-gray-400">Role</dt>
                <dd class="mt-1.5 text-sm font-medium text-gray-800">{{ role }}</dd>
              </div>
              <div>
                <dt class="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Employee ID
                </dt>
                <dd class="mt-1.5 text-sm font-medium text-gray-800">{{ employeeId }}</dd>
              </div>
            </dl>
          </article>
        </section>

        <aside class="space-y-5">
          <article class="rounded-xl border border-surface-border bg-surface-card p-5 shadow-sm">
            <div class="mb-4 flex items-start gap-3">
              <div
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-success-muted text-success"
              >
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                >
                  <path d="M12 3 5 6v5c0 4.5 2.9 8.3 7 10 4.1-1.7 7-5.5 7-10V6l-7-3Z"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
              </div>
              <div>
                <h2 class="font-semibold text-gray-900">Workspace access</h2>
                <p class="mt-1 text-sm text-gray-500">Your current access level.</p>
              </div>
            </div>
            <div class="rounded-lg border border-surface-border bg-gray-25 p-3.5">
              <p class="text-sm font-medium text-gray-800">{{ role }} access</p>
              <p class="mt-1 text-xs leading-5 text-gray-500">
                You can access the dashboards and employee insights available to your role.
              </p>
            </div>
          </article>

          <article class="rounded-xl border border-primary/20 bg-primary-muted p-5">
            <h2 class="font-semibold text-primary">Need to change preferences?</h2>
            <p class="mt-1.5 text-sm leading-5 text-primary/75">
              Update your theme, language, notifications, and default views in Settings.
            </p>
            <a
              routerLink="/settings"
              class="mt-4 inline-flex items-center rounded-lg bg-primary px-3.5 py-2 text-sm font-semibold text-white no-underline transition hover:bg-primary-hover"
            >
              Open Settings
              <span class="ml-2" aria-hidden="true">→</span>
            </a>
          </article>
        </aside>
      </main>
    </div>
  `,
})
export class ProfileComponent {
  private readonly authService = inject(AuthService);
  private readonly currentUser = this.authService.getCurrentUser();

  name = this.currentUser?.username || 'John Doe';
  email = this.currentUser?.email || 'john@example.com';
  role = this.currentUser?.roles?.[0] || 'Manager';
  employeeId = this.currentUser?.id || 'EMP-0001';
  initials = this.name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}
