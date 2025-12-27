import { Component, Input, SimpleChanges, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-multi-select',
  standalone: true,
  imports: [NgSelectModule, FormsModule],
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectComponent),
      multi: true
    }
  ]
})
export class MultiSelectComponent implements ControlValueAccessor {

  @Input() items: string[] = [];
  @Input() placeholder = 'Select items';

  originalItems: string[] = [];
  availableItems: string[] = []; 

  value: string[] = [];

  private onChange = (value: any) => {};
  private onTouched = () => {};

    ngOnChanges(changes: SimpleChanges) {
    if (changes['items']) {
      this.originalItems = [...this.items];
      this.updateAvailableItems();
    }
  }

  writeValue(value: string[]): void {
    this.value = value || [];
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  addTagFn(name: string) {
    return name;
  }

  onValueChange(val: string[]) {
    this.value = val;
    this.onChange(val);
    this.onTouched();
    this.updateAvailableItems();
  }


  private updateAvailableItems() {
    this.availableItems = this.originalItems.filter(item => !this.value.includes(item));
  }
}
