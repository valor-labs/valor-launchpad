import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksComponent } from './tasks.component';
import { UiModule } from '@valor-launchpad/ui';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpModule } from '@valor-launchpad/http';
import { environment } from '../../../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UiModule,
        DragDropModule,
        HttpClientTestingModule,
        HttpModule.forRoot({ environment }),
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        ModalModule,
      ],
      declarations: [TasksComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
