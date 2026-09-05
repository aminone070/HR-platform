import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { I18nService, ThemeService } from '../../../core';
import * as PreferencesActions from '../store/preferences.actions';
import {
  selectDefaultDashboard,
  selectEmailNotifications,
  selectItemsPerPage,
  selectLanguage,
  selectNotificationsEnabled,
  selectPreferences,
  selectPreferencesError,
  selectPreferencesLoading,
  selectPushNotifications,
  selectSavedFilters,
  selectTheme,
} from '../store/preferences.selectors';
import { SavedFilter, UserPreferences } from '../store/preferences.state';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-full bg-surface-bg p-4 sm:p-6 lg:p-8">
      <header class="mx-auto mb-6 max-w-6xl">
        <p class="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-primary">Workspace</p>
        <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Settings & Preferences</h1>
            <p class="mt-2 max-w-2xl text-sm text-gray-500">
              Personalize your workspace, notifications, language, and default views.
            </p>
          </div>
          <div
            *ngIf="preferences$ | async as preferences"
            class="flex items-center gap-2 text-xs text-gray-500"
          >
            <span class="h-2 w-2 rounded-full bg-success"></span>
            Preferences saved locally for {{ preferences.userId }}
          </div>
        </div>
      </header>

      <main class="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section class="space-y-5">
          <!-- Appearance -->
          <article class="rounded-xl border border-surface-border bg-surface-card p-5 shadow-sm sm:p-6">
            <div class="mb-5 flex items-start gap-3">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-muted text-primary">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <circle cx="12" cy="12" r="4"></circle>
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"></path>
                </svg>
              </div>
              <div>
                <h2 class="font-semibold text-gray-900">Appearance</h2>
                <p class="mt-1 text-sm text-gray-500">Choose how the platform looks for you.</p>
              </div>
            </div>

            <div class="grid gap-4 sm:grid-cols-2">
              <div>
                <span class="mb-2 block text-sm font-medium text-gray-700">Theme</span>
                <div class="grid grid-cols-2 gap-2" role="group" aria-label="Theme">
                  <button
                    type="button"
                    (click)="setTheme('light')"
                    [class.border-primary]="(theme$ | async) === 'light'"
                    [class.bg-primary-muted]="(theme$ | async) === 'light'"
                    class="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:border-primary hover:text-primary"
                  >
                    <span class="h-3 w-3 rounded-full border border-amber-300 bg-amber-100"></span>
                    Light
                  </button>
                  <button
                    type="button"
                    (click)="setTheme('dark')"
                    [class.border-primary]="(theme$ | async) === 'dark'"
                    [class.bg-primary-muted]="(theme$ | async) === 'dark'"
                    class="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:border-primary hover:text-primary"
                  >
                    <span class="h-3 w-3 rounded-full border border-slate-500 bg-slate-800"></span>
                    Dark
                  </button>
                </div>
              </div>

              <label class="block">
                <span class="mb-2 block text-sm font-medium text-gray-700">Language</span>
                <select
                  [ngModel]="language$ | async"
                  (ngModelChange)="setLanguage($event)"
                  class="w-full rounded-lg border border-gray-200 bg-surface-card px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary-muted"
                >
                  <option value="en">English</option>
                  <option value="ar">العربية</option>
                </select>
              </label>
            </div>
          </article>

          <!-- Notifications -->
          <article class="rounded-xl border border-surface-border bg-surface-card p-5 shadow-sm sm:p-6">
            <div class="mb-5 flex items-start gap-3">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-info-muted text-info">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"></path>
                </svg>
              </div>
              <div>
                <h2 class="font-semibold text-gray-900">Notifications</h2>
                <p class="mt-1 text-sm text-gray-500">Control the updates you receive from the platform.</p>
              </div>
            </div>

            <div class="divide-y divide-surface-divider">
              <label class="flex cursor-pointer items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                <span>
                  <span class="block text-sm font-medium text-gray-800">Enable notifications</span>
                  <span class="mt-1 block text-xs text-gray-500">Receive important activity and reminder updates.</span>
                </span>
                <input
                  type="checkbox"
                  [checked]="(notificationsEnabled$ | async) ?? true"
                  (change)="updatePreference({ notificationsEnabled: $any($event.target).checked })"
                  class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
              </label>
              <label class="flex cursor-pointer items-center justify-between gap-4 py-3">
                <span>
                  <span class="block text-sm font-medium text-gray-800">Email notifications</span>
                  <span class="mt-1 block text-xs text-gray-500">Get summaries and alerts in your inbox.</span>
                </span>
                <input
                  type="checkbox"
                  [checked]="(emailNotifications$ | async) ?? true"
                  (change)="updatePreference({ emailNotifications: $any($event.target).checked })"
                  class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
              </label>
              <label class="flex cursor-pointer items-center justify-between gap-4 py-3 last:pb-0">
                <span>
                  <span class="block text-sm font-medium text-gray-800">Push notifications</span>
                  <span class="mt-1 block text-xs text-gray-500">Keep live alerts visible while you work.</span>
                </span>
                <input
                  type="checkbox"
                  [checked]="(pushNotifications$ | async) ?? true"
                  (change)="updatePreference({ pushNotifications: $any($event.target).checked })"
                  class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
              </label>
            </div>
          </article>

          <!-- Workspace defaults -->
          <article class="rounded-xl border border-surface-border bg-surface-card p-5 shadow-sm sm:p-6">
            <div class="mb-5 flex items-start gap-3">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-success-muted text-success">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <rect x="3" y="3" width="7" height="7" rx="1"></rect>
                  <rect x="14" y="3" width="7" height="7" rx="1"></rect>
                  <rect x="3" y="14" width="7" height="7" rx="1"></rect>
                  <rect x="14" y="14" width="7" height="7" rx="1"></rect>
                </svg>
              </div>
              <div>
                <h2 class="font-semibold text-gray-900">Workspace defaults</h2>
                <p class="mt-1 text-sm text-gray-500">Set the first view and page size used across the app.</p>
              </div>
            </div>

            <div class="grid gap-4 sm:grid-cols-2">
              <label class="block">
                <span class="mb-2 block text-sm font-medium text-gray-700">Default dashboard</span>
                <select
                  [ngModel]="defaultDashboard$ | async"
                  (ngModelChange)="updatePreference({ defaultDashboard: $event })"
                  class="w-full rounded-lg border border-gray-200 bg-surface-card px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary-muted"
                >
                  <option value="main">Executive overview</option>
                  <option value="workforce">Workforce analytics</option>
                  <option value="attendance">Attendance</option>
                </select>
              </label>
              <label class="block">
                <span class="mb-2 block text-sm font-medium text-gray-700">Rows per page</span>
                <select
                  [ngModel]="itemsPerPage$ | async"
                  (ngModelChange)="updatePreference({ itemsPerPage: +$event })"
                  class="w-full rounded-lg border border-gray-200 bg-surface-card px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary-muted"
                >
                  <option [value]="10">10 rows</option>
                  <option [value]="25">25 rows</option>
                  <option [value]="50">50 rows</option>
                  <option [value]="100">100 rows</option>
                </select>
              </label>
            </div>
          </article>
        </section>

        <aside class="space-y-5">
          <article class="rounded-xl border border-surface-border bg-surface-card p-5 shadow-sm">
            <h2 class="font-semibold text-gray-900">Saved filters</h2>
            <p class="mt-1 text-sm text-gray-500">Quick access to filters you save from analytics pages.</p>

            <ng-container *ngIf="savedFilters$ | async as filters">
              <div *ngIf="filters.length; else noFilters" class="mt-4 space-y-2">
                <div
                  *ngFor="let filter of filters"
                  class="flex items-center justify-between gap-3 rounded-lg border border-surface-border px-3 py-2.5"
                >
                  <div class="min-w-0">
                    <p class="truncate text-sm font-medium text-gray-800">{{ filter.name }}</p>
                    <p class="mt-0.5 text-xs text-gray-400">{{ filter.createdAt | date:'mediumDate' }}</p>
                  </div>
                  <button
                    type="button"
                    (click)="removeFilter(filter)"
                    class="rounded-md p-1.5 text-gray-400 transition hover:bg-error-muted hover:text-error"
                    [attr.aria-label]="'Remove ' + filter.name"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v5M14 11v5"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <ng-template #noFilters>
                <div class="mt-5 rounded-lg border border-dashed border-gray-200 bg-gray-50 p-5 text-center">
                  <div class="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                      <path d="M4 5h16M7 12h10M10 19h4"></path>
                    </svg>
                  </div>
                  <p class="mt-3 text-sm font-medium text-gray-700">No saved filters yet</p>
                  <p class="mt-1 text-xs text-gray-500">Saved filters will appear here.</p>
                </div>
              </ng-template>
            </ng-container>
          </article>

          <article class="rounded-xl border border-primary/20 bg-primary-muted p-5">
            <div class="flex items-start gap-3">
              <svg class="mt-0.5 shrink-0 text-primary" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <circle cx="12" cy="12" r="9"></circle>
                <path d="M12 11v5M12 8h.01"></path>
              </svg>
              <div>
                <h2 class="text-sm font-semibold text-primary-dark">Your preferences are private</h2>
                <p class="mt-1 text-xs leading-5 text-primary-dark/80">
                  These settings are stored in this browser and apply to your current workspace.
                </p>
              </div>
            </div>
          </article>
        </aside>
      </main>

      <div *ngIf="preferencesError$ | async as error" class="mx-auto mt-5 max-w-6xl rounded-lg border border-error/20 bg-error-muted px-4 py-3 text-sm text-error">
        {{ error }}
      </div>
      <div *ngIf="preferencesLoading$ | async" class="mx-auto mt-4 max-w-6xl text-xs text-gray-400">
        Saving preferences…
      </div>
    </div>
  `,
})
export class SettingsComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly themeService = inject(ThemeService);
  private readonly i18nService = inject(I18nService);

  readonly preferences$: Observable<UserPreferences | null> = this.store.select(selectPreferences);
  readonly preferencesLoading$ = this.store.select(selectPreferencesLoading);
  readonly preferencesError$ = this.store.select(selectPreferencesError);
  readonly theme$ = this.store.select(selectTheme);
  readonly language$ = this.store.select(selectLanguage);
  readonly notificationsEnabled$ = this.store.select(selectNotificationsEnabled);
  readonly emailNotifications$ = this.store.select(selectEmailNotifications);
  readonly pushNotifications$ = this.store.select(selectPushNotifications);
  readonly itemsPerPage$ = this.store.select(selectItemsPerPage);
  readonly defaultDashboard$ = this.store.select(selectDefaultDashboard);
  readonly savedFilters$ = this.store.select(selectSavedFilters);

  ngOnInit(): void {
    this.store.dispatch(PreferencesActions.loadPreferences());
  }

  setTheme(theme: 'light' | 'dark'): void {
    this.themeService.setTheme(theme);
    this.updatePreference({ theme, darkMode: theme === 'dark' });
  }

  setLanguage(language: 'en' | 'ar'): void {
    this.i18nService.setLanguage(language);
    this.updatePreference({ language });
  }

  updatePreference(preferences: Partial<UserPreferences>): void {
    this.store.dispatch(PreferencesActions.updatePreferences({ preferences }));
  }

  removeFilter(filter: SavedFilter): void {
    this.store.dispatch(PreferencesActions.removeSavedFilter({ filterId: filter.id }));
  }
}