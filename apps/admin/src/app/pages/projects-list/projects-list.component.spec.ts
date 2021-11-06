import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsListComponent } from './projects-list.component';
import { HttpModule } from '@valor-launchpad/http';
import { environment } from '../../../environments/environment';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '@valor-launchpad/ui';
import { ProjectListItemComponent } from './project-list-item/project-list-item.component';
import { ProjectListFilterComponent } from './project-list-filter/project-list-filter.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ProjectsListComponent', () => {
  let component: ProjectsListComponent;
  let fixture: ComponentFixture<ProjectsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpModule.forRoot({ environment }),
        HttpClientTestingModule,
        ReactiveFormsModule,
        UiModule,
        BsDropdownModule.forRoot(),
        NoopAnimationsModule,
      ],
      declarations: [
        ProjectsListComponent,
        ProjectListItemComponent,
        ProjectListFilterComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
