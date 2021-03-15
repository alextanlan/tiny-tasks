import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'tiny-search-tasks',
  templateUrl: './search-tasks.component.html',
  styleUrls: ['./search-tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchTasksComponent implements OnInit {
  @Output() emitted = new EventEmitter<string>();
  searchControl: FormControl;

  ngOnInit(): void {
    this.searchControl = new FormControl('');

    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(value => this.emitted.emit(value))
    ).subscribe();
  }
}
