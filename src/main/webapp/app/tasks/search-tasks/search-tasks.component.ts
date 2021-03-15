import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'tiny-search-tasks',
  templateUrl: './search-tasks.component.html',
  styleUrls: ['./search-tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchTasksComponent implements OnInit {
  @Input() set reset$(reset$: Subject<void>) {
    reset$.subscribe(_ => {
      this.resetSearch();
    })
  }

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

  resetSearch() {
    this.searchControl.reset();
  }
}
