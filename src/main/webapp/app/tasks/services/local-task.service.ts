import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { v4 as uuid } from 'uuid';

import { Task } from '../task';
import { TaskService } from '../task.service';

enum LogicalOperators {
  AND = 'AND'
}

@Injectable()
export class LocalTaskService implements TaskService {
  private static readonly STORAGE_KEY: string = 'tiny.tasks';

  getAll(): Observable<Task[]> {
    return of(this.readTasks());
  }

  getByQuery(query: string): Observable<Task[]> {
    const terms = query.split(LogicalOperators.AND).map(x => x.trim());
    const res = this.readTasks().filter(this.includesAllTermsInTaskName(terms));

    return of(res);
  }

  create(name: string): Observable<Task> {
    const tasks = this.readTasks();
    const task = {id: uuid(), name};
    tasks.push(task);
    this.writeTasks(tasks);
    return of(task);
  }

  delete(id: string): Observable<void> {
    const tasks = this.readTasks();
    const index = tasks.findIndex(task => task.id === id);
    if (index !== -1) {
      tasks.splice(index, 1);
      this.writeTasks(tasks);
    }
    return of(null);
  }

  private readTasks(): Task[] {
    const tasks = localStorage.getItem(LocalTaskService.STORAGE_KEY);
    return tasks ? JSON.parse(tasks) : [];
  }

  private writeTasks(tasks: Task[]): void {
    localStorage.setItem(LocalTaskService.STORAGE_KEY, JSON.stringify(tasks));
  }

  private includesAllTermsInTaskName(terms: string[]): (task: Task) => boolean {
    return (task: Task) => task.name && terms.every((term: string) => task.name.includes(term));
  }
}
