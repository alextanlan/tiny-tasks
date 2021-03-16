import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
    });
  }
  @Output() emitted = new EventEmitter<string>();
  searchControl: FormControl;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.searchControl = new FormControl('');
    this.checkQueryFromUrl();
    this.onValueChanged();
  }

  resetSearch(): void {
    this.searchControl.reset();
  }

  private checkQueryFromUrl(): void {
    this.route.queryParams.subscribe(params => {
      const query = params.q;
      if (query) {
        this.searchControl.setValue(query);
      }
    });
  }

  private onValueChanged(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(value => this.emitted.emit(value))
    ).subscribe();
  }
}
