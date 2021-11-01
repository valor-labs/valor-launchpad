import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListFilterComponent } from './project-list-filter.component';
import { HttpModule } from '@valor-launchpad/http';
import { environment } from '../../../../environments/environment';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '@valor-launchpad/ui';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ProjectsListComponent', () => {
  let component: ProjectListFilterComponent;
  let fixture: ComponentFixture<ProjectListFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpModule.forRoot({ environment }),
        BsDropdownModule.forRoot(),
        HttpClientTestingModule,
        ReactiveFormsModule,
        UiModule,
        BrowserAnimationsModule,
      ],
      declarations: [ProjectListFilterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
