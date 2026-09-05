import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-full bg-surface-bg p-7 max-md:p-4">
      <div class="page-header">
        <div>
          <h1 class="page-title">Attendance</h1>
          <p class="page-subtitle">July 2026 — tracking 1,284 employees</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <button class="btn btn-secondary">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export
          </button>
          <button class="btn btn-primary">Mark Attendance</button>
        </div>
      </div>

      <!-- KPI strip -->
      <div class="mb-6 grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
        <div *ngFor="let k of kpis" class="stat-card card-3d" [style.--stat-accent]="k.color">
          <div class="stat-label">{{ k.label }}</div>
          <div class="stat-value mt-2">{{ k.value }}</div>
          <div class="stat-delta mt-1.5" [class.up]="k.up" [class.down]="!k.up">
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
            >
              <polyline [attr.points]="k.up ? '18 15 12 9 6 15' : '6 9 12 15 18 9'" />
            </svg>
            {{ k.delta }} this month
          </div>
        </div>
      </div>

      <div class="grid items-start gap-4 xl:grid-cols-[minmax(0,1.08fr)_minmax(420px,0.92fr)]">
        <!-- Attendance heat calendar -->
        <div class="card-3d">
          <div
            class="flex flex-wrap items-center justify-between gap-2 border-b border-surface-divider px-5 pb-3 pt-4 max-md:px-4 max-md:pb-2.5 max-md:pt-3"
          >
            <div class="text-sm font-semibold text-gray-900 max-md:text-[13px]">
              July 2026 Attendance Map
            </div>
            <div class="flex items-center gap-2 text-[11.5px] text-gray-400">
              <span class="inline-flex items-center gap-1"
                ><span class="h-2.5 w-2.5 rounded-[3px] bg-success"></span>High</span
              >
              <span class="inline-flex items-center gap-1"
                ><span class="h-2.5 w-2.5 rounded-[3px] bg-warning"></span>Medium</span
              >
              <span class="inline-flex items-center gap-1"
                ><span class="h-2.5 w-2.5 rounded-[3px] bg-error"></span>Low</span
              >
            </div>
          </div>
          <div class="p-5 max-md:p-4">
            <div class="grid grid-cols-7 gap-1 max-md:gap-0.5">
              <div
                *ngFor="let d of dayLabels"
                class="pb-1 text-center text-[10px] font-semibold uppercase tracking-wide text-gray-400 max-md:pb-0.5 max-md:text-[8px]"
              >
                {{ d }}
              </div>
              <div
                *ngFor="let cell of calCells"
                [class.empty]="!cell.day"
                [class.has-data]="cell.day && cell.rate !== null"
                [class.today]="cell.isToday"
                [style.background]="cell.day ? cell.bg : ''"
                [style.opacity]="cell.day ? 1 : 0"
                [title]="cell.day ? 'Day ' + cell.day + ': ' + cell.rate + '% attendance' : ''"
                class="flex aspect-square min-h-8 cursor-pointer items-center justify-center rounded border border-transparent text-[10.5px] text-gray-400 transition-all hover:border-primary hover:text-primary max-md:min-h-7 max-md:rounded-sm max-md:text-[9px]"
                [class.text-white]="cell.day && cell.rate !== null"
                [class.font-semibold]="cell.day && cell.rate !== null"
              >
                {{ cell.day || '' }}
              </div>
            </div>
          </div>
        </div>

        <!-- Insight cards -->
        <div class="grid items-start gap-4 sm:grid-cols-2 xl:grid-cols-2">
          <!-- Absence reasons -->
          <div class="card-3d self-start">
            <div
              class="flex flex-wrap items-center justify-between gap-2 border-b border-surface-divider px-5 pb-3 pt-4 max-md:px-4 max-md:pb-2.5 max-md:pt-3"
            >
              <div>
                <div class="text-sm font-semibold text-gray-900 max-md:text-[13px]">
                  Absence Reasons
                </div>
                <p class="mt-1 text-[11px] text-gray-400">
                  Breakdown of today's {{ absenceTotal }} absences
                </p>
              </div>
              <span class="badge badge-neutral">{{ absenceTotal }} total</span>
            </div>
            <div class="px-5 pb-4 pt-2.5 max-md:px-4">
              <div
                *ngFor="let r of absenceReasons"
                class="border-b border-surface-divider py-2.5 last:border-b-0 last:pb-0"
              >
                <div class="grid grid-cols-[auto_1fr_auto] items-center gap-2.5">
                  <div
                    class="h-2.5 w-2.5 shrink-0 rounded-[3px]"
                    [style.background]="r.color"
                  ></div>
                  <span class="min-w-0 truncate text-[12.5px] text-gray-700 max-md:text-[11.5px]">{{
                    r.label
                  }}</span>
                  <span
                    class="text-right text-[12.5px] font-semibold text-gray-900 max-md:text-[11.5px]"
                    >{{ r.count }}
                    <span class="ml-0.5 text-[11px] font-normal text-gray-400"
                      >({{ r.pct }}%)</span
                    ></span
                  >
                </div>
                <div class="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    class="h-full rounded-full transition-all duration-300"
                    [style.width.%]="r.pct"
                    [style.background]="r.color"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Late arrivals trend -->
          <div class="card-3d self-start">
            <div
              class="flex flex-wrap items-center justify-between gap-2 border-b border-surface-divider px-5 pb-3 pt-4 max-md:px-4 max-md:pb-2.5 max-md:pt-3"
            >
              <div>
                <div class="text-sm font-semibold text-gray-900 max-md:text-[13px]">
                  Late Arrivals
                </div>
                <p class="mt-1 text-[11px] text-gray-400">Department comparison for today</p>
              </div>
              <span class="badge badge-error">{{ lateTotal }} total</span>
            </div>
            <div class="px-5 pb-4 pt-2.5 max-md:px-4">
              <div
                *ngFor="let l of lateByDept"
                class="border-b border-surface-divider py-2.5 last:border-b-0 last:pb-0"
              >
                <div class="mb-1.5 flex items-center justify-between gap-2">
                  <span class="text-[12.5px] text-gray-700 max-md:text-[11.5px]">{{ l.dept }}</span>
                  <div class="flex items-center gap-1.5">
                    <span class="text-[12px] font-semibold text-gray-800">{{ l.late }}</span>
                    <span
                      class="rounded-full px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide"
                      [ngClass]="
                        l.severity === 'High'
                          ? 'bg-error-muted text-error'
                          : l.severity === 'Medium'
                            ? 'bg-warning-muted text-warning'
                            : 'bg-success-muted text-success'
                      "
                    >
                      {{ l.severity }}
                    </span>
                  </div>
                </div>
                <div
                  class="h-1.5 w-full overflow-hidden rounded-full bg-gray-100"
                  [attr.aria-label]="l.dept + ': ' + l.rate + '% late arrival rate'"
                >
                  <div
                    class="h-full rounded-full transition-all duration-300"
                    [style.width.%]="l.pct"
                    [style.background]="l.color"
                  ></div>
                </div>
                <div class="mt-1 text-[10px] text-gray-400">{{ l.rate }}% late arrival rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Today's attendance records -->
      <div
        class="mt-4 overflow-hidden overflow-x-auto rounded-lg border border-surface-border bg-surface-card shadow-sm"
      >
        <div
          class="flex flex-wrap items-center justify-between gap-2 border-b border-surface-divider px-[18px] py-3.5"
        >
          <div>
            <div class="text-sm font-semibold text-gray-900">Today's Records</div>
            <p class="mt-1 text-[11px] text-gray-400">
              Live attendance activity across the organization
            </p>
          </div>
          <span class="badge badge-success">{{ todayDate }}</span>
        </div>
        <div class="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Hours</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let r of records">
                <td>
                  <div class="flex items-center gap-2.5">
                    <div
                      class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold text-white max-md:h-7 max-md:w-7 max-md:text-[10px]"
                      [style.background]="r.color"
                    >
                      {{ r.initials }}
                    </div>
                    <div class="text-[13.5px] font-medium text-gray-900">{{ r.name }}</div>
                  </div>
                </td>
                <td class="text-gray-500">{{ r.dept }}</td>
                <td class="text-[13px] text-gray-700">{{ r.checkIn }}</td>
                <td class="text-[13px] text-gray-700">{{ r.checkOut }}</td>
                <td class="text-[13px] font-semibold text-gray-900">{{ r.hours }}</td>
                <td>
                  <span class="badge" [ngClass]="r.statusClass">{{ r.status }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
})
export class AttendanceComponent {
  todayDate = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  kpis = [
    { label: 'Attendance Rate', value: '96.2%', delta: '+0.4%', up: true, color: '#16a34a' },
    { label: 'Present Today', value: '1,236', delta: '+14', up: true, color: '#4f6ef7' },
    { label: 'Absent Today', value: '48', delta: '-6', up: true, color: '#d97706' },
    { label: 'Late Arrivals', value: '22', delta: '-3', up: true, color: '#dc2626' },
  ];

  dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  calCells = (() => {
    const cells = [];
    const rates = [
      98,
      96,
      97,
      95,
      94,
      null,
      null,
      97,
      96,
      98,
      96,
      95,
      null,
      null,
      96,
      97,
      95,
      94,
      96,
      null,
      null,
      97,
      98,
      96,
      97,
      94,
      null,
      null,
      96,
      97,
      95,
    ];
    const colors = (r: number | null) => {
      if (!r) return 'var(--gray-100)';
      if (r >= 97) return '#16a34a';
      if (r >= 94) return '#4f6ef7';
      if (r >= 90) return '#d97706';
      return '#dc2626';
    };
    // July 2026 starts on Wednesday (index 2)
    for (let i = 0; i < 2; i++) cells.push({ day: 0, rate: null, bg: '', isToday: false });
    for (let d = 1; d <= 31; d++) {
      const r = rates[d - 1];
      cells.push({ day: d, rate: r, bg: colors(r), isToday: d === 20 });
    }
    return cells;
  })();

  absenceReasons = [
    { label: 'Sick Leave', count: 18, pct: 38, color: '#dc2626' },
    { label: 'Personal', count: 12, pct: 25, color: '#d97706' },
    { label: 'Vacation', count: 10, pct: 21, color: '#4f6ef7' },
    { label: 'Work from Home', count: 5, pct: 10, color: '#7c5cfc' },
    { label: 'Other', count: 3, pct: 6, color: '#667085' },
  ];
  absenceTotal = this.absenceReasons.reduce((total, reason) => total + reason.count, 0);

  lateByDept = [
    { dept: 'Engineering', late: 8, pct: 64, rate: 6.2, severity: 'High', color: '#dc2626' },
    { dept: 'Sales', late: 5, pct: 40, rate: 4.8, severity: 'Medium', color: '#d97706' },
    { dept: 'Marketing', late: 4, pct: 32, rate: 3.9, severity: 'Medium', color: '#d97706' },
    { dept: 'Finance', late: 3, pct: 24, rate: 2.7, severity: 'Low', color: '#4f6ef7' },
    { dept: 'HR', late: 2, pct: 16, rate: 1.8, severity: 'Low', color: '#16a34a' },
  ];
  lateTotal = this.lateByDept.reduce((total, department) => total + department.late, 0);

  records = [
    {
      name: 'Sarah Mitchell',
      dept: 'Engineering',
      initials: 'SM',
      color: '#4f6ef7',
      checkIn: '08:52',
      checkOut: '—',
      hours: '—',
      status: 'Present',
      statusClass: 'badge-success',
    },
    {
      name: 'James Okafor',
      dept: 'Sales',
      initials: 'JO',
      color: '#7c5cfc',
      checkIn: '09:14',
      checkOut: '—',
      hours: '—',
      status: 'Present',
      statusClass: 'badge-success',
    },
    {
      name: 'Amara Diallo',
      dept: 'Sales',
      initials: 'AD',
      color: '#7c5cfc',
      checkIn: '—',
      checkOut: '—',
      hours: '—',
      status: 'On Leave',
      statusClass: 'badge-warning',
    },
    {
      name: 'Tom Nakamura',
      dept: 'Finance',
      initials: 'TN',
      color: '#d97706',
      checkIn: '09:42',
      checkOut: '—',
      hours: '—',
      status: 'Late',
      statusClass: 'badge-error',
    },
    {
      name: 'Layla Hassan',
      dept: 'HR',
      initials: 'LH',
      color: '#dc2626',
      checkIn: '08:58',
      checkOut: '—',
      hours: '—',
      status: 'Present',
      statusClass: 'badge-success',
    },
    {
      name: 'Priya Sharma',
      dept: 'Marketing',
      initials: 'PS',
      color: '#06b6d4',
      checkIn: '—',
      checkOut: '—',
      hours: '—',
      status: 'Absent',
      statusClass: 'badge-neutral',
    },
  ];
}
