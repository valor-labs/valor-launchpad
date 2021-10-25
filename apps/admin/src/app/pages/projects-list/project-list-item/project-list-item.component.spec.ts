import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListItemComponent } from './project-list-item.component';
import { ProjectListItemVo } from '@valor-launchpad/api-interfaces';
import { UiModule } from '@valor-launchpad/ui';
import { HttpModule } from '@valor-launchpad/http';
import { environment } from '../../../../environments/environment';
import { RouterTestingModule } from '@angular/router/testing';

const MOCK_PROJECT_DETAIL: ProjectListItemVo = {
  id: 'id',
  title: 'title',
  body: 'body',
  deletable: true,
  cloneable: true,
  status: 'FINISHED',
  hero: { src: '', src_webp: '', alt: '', type: '' },
  assignee: [],
  progress: 10,
  createdDate: new Date('2021-10-01'),
};

describe('ProjectListItemComponent', () => {
  let component: ProjectListItemComponent;
  let fixture: ComponentFixture<ProjectListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UiModule,
        HttpModule.forRoot({ environment }),
        RouterTestingModule,
      ],
      declarations: [ProjectListItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListItemComponent);
    component = fixture.componentInstance;
    component.config = MOCK_PROJECT_DETAIL;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
