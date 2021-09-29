import { Component, ElementRef, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ProjectsListService } from './projects-list.service';
// TODO: find a better place for these and refactor them to be cleaner
import { Project } from '@api/projects';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { Notyf, NOTYFToken } from '@valor-launchpad/ui';

@Component({
  selector: 'valor-launchpad-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {
  newProjectFg: FormGroup;
  validPicSuffixs = ['jpg', 'jpeg', 'png'];
  projects: Array<Project> = [];

  constructor(
    private projectsListService: ProjectsListService,
    private fb: FormBuilder,
    @Inject(NOTYFToken) private notyf: Notyf
  ) {
    this._initProjectData();
  }

  private _initProjectData(): void {
    this.projectsListService.getProjects().subscribe((data: Array<Project>) => {
      this.projects = data;
    });
  }

  onOpenCreateNewProjectModal() {
    this.isCreateProjectShow = true;
  }


  ngOnInit(): void {
    this.newProjectFg = this.fb.group(
      {
        projectTitle: new FormControl(null, Validators.required, this.validateNameViaServer.bind(this)),
        projectContent: '',
        projectProgress: 20,
        projectStatus: 'inProgress',
        projectActions: new FormControl(['delete', 'clone'], Validators.required),
        projectFile: new FormControl(null, [Validators.required, this.fileExtensionValidator(this.validPicSuffixs)])
      }
    );
  }

  fileExtensionValidator(validExt: string[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let forbidden;
      if (control.value) {
        forbidden = true;
        const fileExt = control.value.split('.').pop();
        validExt.some(ext => {
          if (ext.trim() == fileExt) {
            forbidden = false;
            return true;
          }
        });
      }
      return forbidden ? { 'inValidExt': true } : null;
    };
  }

  validateNameViaServer({ value }: AbstractControl): Observable<ValidationErrors | null> {
    return this.projectsListService.isNameExists(value)
      .pipe(
        debounceTime(500),
        map((nameExists: boolean) => {
          if (nameExists) {
            return {
              isExists: true
            };
          }
          return null;
        })
      );
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  isCreateProjectShow = false;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  projectProgressItem = [0, 20, 40, 60, 80];
  // eslint-disable-next-line @typescript-eslint/member-ordering
  projectStatusItem = [
    {
      key: 'Finished',
      value: 'finish'
    },
    {
      key: 'On hold',
      value: 'onHold'
    },
    {
      key: 'In Progress',
      value: 'inProgress'
    }
  ];
  // eslint-disable-next-line @typescript-eslint/member-ordering
  projectActionOptions = [
    { label: 'Delete', value: 'delete' },
    { label: 'Clone', value: 'clone' }
  ];

  onCloseProjectShow(): void {
    this.isCreateProjectShow = false;
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  @ViewChild('projectPicture') projectPicture: ElementRef;

  async onCreateProject(): Promise<void> {
    this.newProjectFg.updateValueAndValidity();
    this.newProjectFg.markAllAsTouched();
    const base64Pic = await this._getPicBase64();
    if (base64Pic === null) {
      this.notyf.error('picture upload failure, please re-upload.');
      return;
    }

    if (this.newProjectFg.valid) {
      this.projectsListService.createProject(this._convertKeys(this.newProjectFg.value, base64Pic))
        .subscribe(res => {
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
    this._initProjectData();
  }

  private async _getPicBase64(): Promise<any> {
    return new Promise((resolve, reject) => {
      const file = this.projectPicture.nativeElement.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function() {
        resolve(reader.result);
      };
      reader.onerror = function(error) {
        resolve(null);
      };
    });
  }


  private _convertKeys(newProjectObj: { [key: string]: any }, pic): Partial<Project> {
    const statusMap = {
      inProgress: { title: 'In Progress', status: 'bg-warning' },
      finish: { title: 'Finished', status: 'bg-success' },
      onHold: { title: 'On hold', status: 'bg-danger' }
    };

    const actionMap = {
      delete: { type: 'fas fa-trash', title: 'Delete' },
      clone: { type: 'fas fa-copy', title: 'Clone' }
    };

    return {
      title: newProjectObj.projectTitle,
      body: newProjectObj.projectContent,
      progress: +newProjectObj.projectProgress,
      badge: statusMap[newProjectObj.projectStatus],
      actions: newProjectObj.projectActions.map(item => actionMap[item]),
      hero: {
        src: pic,
        alt: ''
      }
    };
  }


}
