import { TestBed } from '@angular/core/testing';
import { LocalTaskService } from 'app/tasks/local-task.service';
import { Observable } from 'rxjs';
import { Task } from './task';

describe('LocalTaskService', () => {
  const id = 'de4f576e-d1b5-488a-8c77-63d4c8726909';
  const name = 'Doing the do!';
  const mockTask = `{"id":"${id}","name":"${name}"}`;
  const mockTasks = [
    {id: 'id1', name: 'Task1'},
    {id: 'id2', name: 'Task2'}
  ];
  let taskService: LocalTaskService;
  let getItemSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalTaskService]
    });

    taskService = TestBed.inject(LocalTaskService);
    getItemSpy = spyOn(localStorage, 'getItem').and.callFake(() => `[${mockTask}]`);
    spyOn(localStorage, 'setItem').and.callFake(() => {});
  });

  it('should be created', () => {
    expect(taskService).toBeTruthy();
  });

  it('should return tasks from local storage', () => {
    // when
    const taskList$: Observable<Task[]> = taskService.getAll();

    // then
    expect(localStorage.getItem).toHaveBeenCalled();
    taskList$.subscribe(taskList => {
      expect(taskList.length).toBe(1);
      expect(taskList[0].name).toEqual(name);
    });
  });

  it('should return filtered tasks from local storage', () => {
    // when
    getItemSpy.and.callFake(() => JSON.stringify(mockTasks));
    const query = 'ask1';
    const taskList$: Observable<Task[]> = taskService.getByQuery(query);

    // then
    expect(localStorage.getItem).toHaveBeenCalled();
    taskList$.subscribe(taskList => {
      expect(taskList.length).toBe(1);
      expect(taskList[0].name).toEqual('Task1');
    });
  });

  it('should return an empty array of filtered tasks from local storage (if the query does not match)', () => {
    // when
    getItemSpy.and.callFake(() => JSON.stringify(mockTasks));
    const query = 'Nothing similar';
    const taskList$: Observable<Task[]> = taskService.getByQuery(query);

    // then
    expect(localStorage.getItem).toHaveBeenCalled();
    taskList$.subscribe(taskList => {
      expect(taskList.length).toBe(0);
    });
  });

  it('should write task to local storage', () => {
    // when
    taskService.create('Drinking the drink!');

    // then
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('should delete task from local storage', () => {
    // when
    taskService.delete(id);

    // then
    expect(localStorage.getItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});
