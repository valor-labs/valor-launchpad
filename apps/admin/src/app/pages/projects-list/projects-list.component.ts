import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ProjectsListService } from './projects-list.service';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { Notyf, NOTYFToken } from '@valor-launchpad/ui';
import { ProjectListItemVo } from '@valor-launchpad/api-interfaces';

export interface Progress {
  start: number;
  end: number;
}

@Component({
  selector: 'valor-launchpad-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss'],
})
export class ProjectsListComponent implements OnInit {
  newProjectFg: FormGroup;
  validPicSuffixs = ['jpg', 'jpeg', 'png'];
  projects: Array<ProjectListItemVo> = [];

  statusFilter: string[];
  searchFilter: string;
  progressFilter: Progress;
  sortBy: string;
  projectRefreshController$ = new BehaviorSubject(true);

  constructor(
    private projectsListService: ProjectsListService,
    private fb: FormBuilder,
    @Inject(NOTYFToken) private notyf: Notyf
  ) {
    this._initProjectData();
  }

  private _initProjectData(): void {
    this.projectRefreshController$
      .asObservable()
      .pipe(
        switchMap(() => {
          return this.projectsListService.getProjects(
            this.sortBy,
            this.searchFilter,
            this.statusFilter,
            this.progressFilter
          );
        })
      )
      .subscribe((data) => {
        this.projects = data;
      });
  }

  handleSort(event) {
    this.sortBy = event;
    this.projectRefreshController$.next(event);
  }

  handleStatus(event) {
    this.statusFilter = Array.from(event);
    this.projectRefreshController$.next(event);
  }

  handleSearch(event) {
    this.searchFilter = event;
    this.projectRefreshController$.next(event);
  }

  handleProgress(event) {
    this.progressFilter = event;
    this.projectRefreshController$.next(event);
  }

  onOpenCreateNewProjectModal() {
    this.isCreateProjectShow = true;
  }

  onDeleteProject(projectId: string) {
    this.projectsListService.deleteProject(projectId).subscribe(() => {
      this.projectRefreshController$.next(true);
      this.notyf.success('Delete project success');
    });
  }

  onCloneProject(projectId: string, project: ProjectListItemVo) {
    this.newProjectFg.patchValue({
      title: `${project.title}(copy)`,
      body: project.body,
      progress: project.progress,
      status: project.status,
      deletable: project.deletable,
      cloneable: project.cloneable,
    });
    this.onOpenCreateNewProjectModal();
  }

  ngOnInit(): void {
    this.newProjectFg = this.fb.group({
      title: new FormControl(
        null,
        Validators.required,
        this.validateNameViaServer.bind(this)
      ),
      body: '',
      progress: 20,
      status: 'IN_PROGRESS',
      deletable: true,
      cloneable: true,
      projectFile: new FormControl(null, [
        Validators.required,
        this.fileExtensionValidator(this.validPicSuffixs),
      ]),
    });
  }

  fileExtensionValidator(validExt: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let forbidden;
      if (control.value) {
        forbidden = true;
        const fileExt = control.value.split('.').pop();
        validExt.some((ext) => {
          if (ext.trim() == fileExt) {
            forbidden = false;
            return true;
          }
        });
      }
      return forbidden ? { inValidExt: true } : null;
    };
  }

  validateNameViaServer({
    value,
  }: AbstractControl): Observable<ValidationErrors | null> {
    return this.projectsListService.isNameExists(value).pipe(
      debounceTime(500),
      map((nameExists: boolean) => {
        if (nameExists) {
          return {
            isExists: true,
          };
        }
        return null;
      })
    );
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  isCreateProjectShow = false;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  projectStatusItem = [
    {
      key: 'Finished',
      value: 'FINISHED',
    },
    {
      key: 'On hold',
      value: 'ON_HOLD',
    },
    {
      key: 'In Progress',
      value: 'IN_PROGRESS',
    },
  ];
  // eslint-disable-next-line @typescript-eslint/member-ordering
  projectActionOptions = [
    { label: 'Delete', value: 'delete' },
    { label: 'Clone', value: 'clone' },
  ];

  onCloseProjectShow(): void {
    this.isCreateProjectShow = false;
    this.newProjectFg.reset();
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  @ViewChild('projectPicture') projectPicture: ElementRef;

  async onCreateProject(): Promise<void> {
    this.newProjectFg.updateValueAndValidity();
    this.newProjectFg.markAllAsTouched();
    const file = this.projectPicture.nativeElement.files[0];
    if (this.newProjectFg.valid) {
      this.projectsListService
        .createProject(this.newProjectFg.value, file)
        .subscribe((res) => {
          if (typeof res === 'object') {
            this.notyf.success('Create project success');
            this.isCreateProjectShow = false;
            this._resetPage();
          } else {
            this.notyf.error('Create project failure');
            console.error(res);
          }
        });
    }
  }

  private _resetPage(): void {
    this.newProjectFg.reset();
    this.projectRefreshController$.next(true);
  }
}
