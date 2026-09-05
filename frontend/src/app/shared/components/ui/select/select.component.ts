import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
  signal,
  computed,
  HostListener,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface SelectOption {
  value: any;
  label: string;
  disabled?: boolean;
  group?: string;
}

export interface SelectOptionGroup {
  label: string;
  options: SelectOption[];
}

/**
 * Select Component
 *
 * A reusable select component with single/multi-select modes, search functionality,
 * and proper ARIA labels and keyboard navigation.
 *
 * Requirements: 2.3, 8.2, 8.3, 14.1, 14.2
 */
@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './select.component.html',
})
export class SelectComponent implements OnInit, OnChanges {
  @Input() id = 'select-' + Math.random().toString(36).substr(2, 9);
  @Input() label: string | null = null;
  @Input() ariaLabel: string | null = null;
  @Input() options: SelectOption[] = [];
  @Input() multiple = false;
  @Input() value: any = undefined;
  @Input() values: any[] = [];
  @Input() searchable = false;
  @Input() disabled = false;
  @Input() error: string | null = null;
  @Input() placeholder = 'Select an option';
  @Output() selectionChange = new EventEmitter<any>();

  @ViewChild('searchInput') searchInput: ElementRef | null = null;

  isOpen = signal(false);
  selectedValues = signal<any[]>([]);
  searchQuery = signal('');

  ngOnInit() {
    this.syncSelection();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'] || changes['values'] || changes['multiple']) {
      this.syncSelection();
    }
  }

  private syncSelection(): void {
    if (this.multiple) {
      this.selectedValues.set([...this.values]);
    } else if (this.value !== undefined && this.value !== null) {
      this.selectedValues.set([this.value]);
    } else {
      this.selectedValues.set([]);
    }
  }

  toggleOpen() {
    if (!this.disabled) {
      this.isOpen.set(!this.isOpen());
      if (this.isOpen() && this.searchable) {
        setTimeout(() => this.searchInput?.nativeElement?.focus());
      }
    }
  }

  selectOption(option: SelectOption) {
    if (option.disabled) return;

    if (this.multiple) {
      const values = this.selectedValues();
      const index = values.findIndex((v) => v === option.value);
      if (index > -1) {
        values.splice(index, 1);
      } else {
        values.push(option.value);
      }
      this.selectedValues.set([...values]);
    } else {
      this.selectedValues.set([option.value]);
      this.isOpen.set(false);
    }

    this.selectionChange.emit(this.multiple ? this.selectedValues() : option.value);
  }

  isSelected(option: SelectOption): boolean {
    return this.selectedValues().includes(option.value);
  }

  getDisplayValue(): string {
    const values = this.selectedValues();
    if (values.length === 0) return this.placeholder;

    const labels = values
      .map((v) => this.options.find((o) => o.value === v)?.label)
      .filter(Boolean);

    if (this.multiple) {
      return labels.length > 0 ? `${labels.length} selected` : this.placeholder;
    }
    return labels[0] || this.placeholder;
  }

  groupedOptions = computed(() => {
    let filtered = this.options;

    if (this.searchQuery()) {
      const query = this.searchQuery().toLowerCase();
      filtered = filtered.filter((o) => o.label.toLowerCase().includes(query));
    }

    const groups: SelectOptionGroup[] = [];
    const grouped = new Map<string, SelectOption[]>();

    filtered.forEach((option) => {
      const groupLabel = option.group || '';
      if (!grouped.has(groupLabel)) {
        grouped.set(groupLabel, []);
      }
      grouped.get(groupLabel)!.push(option);
    });

    grouped.forEach((opts, label) => {
      groups.push({ label, options: opts });
    });

    return groups;
  });

  onSearchInput() {
    // Trigger computed update
    this.searchQuery.set(this.searchQuery());
  }

  handleKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.toggleOpen();
        break;
      case 'Escape':
        event.preventDefault();
        this.isOpen.set(false);
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!this.isOpen()) this.toggleOpen();
        break;
    }
  }

  handleOptionKeydown(event: KeyboardEvent, index: number) {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        const options = this.groupedOptions().flatMap((g) => g.options);
        if (options[index]) {
          this.selectOption(options[index]);
        }
        break;
      case 'Escape':
        event.preventDefault();
        this.isOpen.set(false);
        break;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest(`#${this.id}`) && !target.closest(`#${this.id}-listbox`)) {
      this.isOpen.set(false);
    }
  }

  getSelectButtonClasses(): string {
    return `w-full rounded-lg border border-gray-200 bg-surface-card px-3 py-2.5 text-left text-sm text-gray-800 shadow-xs outline-none transition-all hover:border-gray-300 focus:ring-2 focus:ring-primary-muted disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-between ${this.isOpen() ? 'border-primary ring-2 ring-primary-muted' : ''}`;
  }

  getDropdownClasses(): string {
    return `absolute left-0 right-0 top-full z-[200] mt-1 max-h-60 overflow-y-auto rounded-lg border border-surface-border bg-surface-card shadow-lg ${this.searchable ? 'pt-10' : ''}`;
  }

  getOptionClasses(option: SelectOption): string {
    const isSelected = this.isSelected(option);
    return `w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 focus:bg-primary-muted focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 flex items-center ${isSelected ? 'bg-primary-muted text-primary font-medium' : ''}`;
  }
}
