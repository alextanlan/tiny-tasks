import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

import { TaskFormComponent } from './task-form/task-form.component';
import { TaskListComponent } from './task-list/task-list.component';
import { SearchTasksComponent } from './search-tasks/search-tasks.component';

@NgModule({
  declarations: [
    TaskFormComponent,
    TaskListComponent,
    SearchTasksComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule
  ],
  exports: [
    TaskFormComponent,
    TaskListComponent,
    SearchTasksComponent
  ]
})
export class TasksModule { }
