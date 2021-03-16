import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, of, Subject } from 'rxjs';

import { SearchTasksComponent } from './search-tasks.component';

describe('SearchTasksComponent', () => {
  let component: SearchTasksComponent;
  let fixture: ComponentFixture<SearchTasksComponent>;
  let ActivatedRouteMock: ActivatedRoute;

  beforeEach(async () => {
    ActivatedRouteMock = jasmine.createSpyObj('ActivatedRoute', ['queryParams']);
    ActivatedRouteMock.queryParams = of(EMPTY);

    await TestBed.configureTestingModule({
      declarations: [ SearchTasksComponent ],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: ActivatedRouteMock}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty value on init', () => {
    component.ngOnInit();
    expect(component.searchControl.value).toEqual('');
  });

  it('should emit changed value', (done) => {
    const emitterSpy = spyOn(component.emitted, 'emit');
    component.ngOnInit();
    const searchInput = fixture.nativeElement.querySelector('input');
    searchInput.value = 'Task1';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(emitterSpy).toHaveBeenCalledWith('Task1');
      done();
    });
  });

  it('should reset search', () => {
    const resetSpy = spyOn(component.searchControl, 'reset');
    component.resetSearch();

    expect(resetSpy).toHaveBeenCalled();
  });

  it('should call search reset by input parameter', () => {
    const externalReset = new Subject<void>();
    const resetSpy = spyOn(component.searchControl, 'reset');
    component.reset$ = externalReset;
    externalReset.next();

    expect(resetSpy).toHaveBeenCalled();
  });

  it('should use query from url', () => {
    ActivatedRouteMock.queryParams = of({q: 'Task1'});
    component.ngOnInit();

    expect(component.searchControl.value).toEqual('Task1');
  });
});
