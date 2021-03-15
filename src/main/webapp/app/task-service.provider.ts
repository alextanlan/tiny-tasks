import { ClassProvider } from '@angular/core';

import { environment } from '../environments/environment';
import { LocalTaskService } from 'app/tasks/local-task.service';
import { DefaultTaskService } from 'app/tasks/default-task.service';
import { TASK_SERVICE_TOKEN } from 'app/app.tokens';

export const TaskServiceProvider: ClassProvider = {
  provide: TASK_SERVICE_TOKEN,
  useClass: environment.useLocalStorage ? LocalTaskService : DefaultTaskService
}
