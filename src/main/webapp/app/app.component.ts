import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from "rxjs/operators";

import { Task } from './tasks/task';
import { TaskService } from './tasks/task.service';
import { TASK_SERVICE_TOKEN } from 'app/app.tokens';

@Component({
  selector: 'tiny-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  tasks$: Observable<Task[]>;

  constructor(@Inject(TASK_SERVICE_TOKEN) private taskService: TaskService) { }

  ngOnInit(): void {
    this.refreshTasks();
  }

  created(): void {
    this.refreshTasks();
  }

  deleted(): void {
    this.refreshTasks();
  }

  searchByQuery(query: string): void {
    if (query) {
      this.receiveTasksByQuery(query);
    } else {
      this.refreshTasks();
    }
  }

  private receiveTasksByQuery(query: string): void {
    this.tasks$ = of(null).pipe(
      switchMap(_ => this.taskService.getByQuery(query))
    );
  }

  private refreshTasks(): void {
    this.tasks$ = this.taskService.getAll();
  }
}
