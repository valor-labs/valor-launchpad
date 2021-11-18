import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { CreateGroupModalComponent } from './create-group-modal.component';
import { UiModule } from '@valor-launchpad/ui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatService } from '../chat.service';
import { By } from '@angular/platform-browser';
import { HttpModule } from '@valor-launchpad/http';
import { environment } from '../../../../environments/environment';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CreateGroupModalComponent', () => {
  let component: CreateGroupModalComponent;
  let fixture: ComponentFixture<CreateGroupModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UiModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule.forRoot({ environment }),
        HttpClientTestingModule,
      ],
      declarations: [CreateGroupModalComponent],
    }).compileComponents();
  });

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(CreateGroupModalComponent);
    component = fixture.componentInstance;
    component.users = [MOCK_USER1, MOCK_USER2];
    fixture.detectChanges();
  }));

  it('should create', fakeAsync(() => {
    expect(component).toBeTruthy();
    const allUserItems = fixture.debugElement.queryAll(
      By.css('.user-list .user-list-item')
    );
    expect(allUserItems.length).toEqual(2);
    expect(fixture.debugElement.nativeElement.textContent).toContain(
      `${MOCK_USER1.firstName} ${MOCK_USER1.lastName}`
    );
  }));

  it('should fetch users once keyword changes', fakeAsync(() => {
    expect(component.userOptions.length).toBe(2);
    component.keywordSearchControl.setValue('John');
    expect(component.userOptions.length).toBe(1);
    component.keywordSearchControl.setValue('');
    expect(component.userOptions.length).toBe(2);
  }));

  it('should select user successfully', () => {
    expect(component.selectedUsers.length).toEqual(0);
    const allUserItems = fixture.debugElement.queryAll(
      By.css('.user-list .user-list-item')
    );
    allUserItems[0].nativeElement.click();
    expect(component.selectedUsers.length).toEqual(1);
    allUserItems[0].nativeElement.click();
    expect(component.selectedUsers.length).toEqual(0);
  });

  it('should fail when group name is not empty', function () {
    const chatService = TestBed.inject(ChatService);
    jest.spyOn(chatService, 'createThread');
    const btn = fixture.debugElement.query(By.css('#create-group'));
    btn.nativeElement.click();
    expect(chatService.createThread).not.toHaveBeenCalled();
  });

  it('should create group chat', fakeAsync(() => {
    jest.spyOn(component.confirmed, 'emit');
    component.groupNameControl.setValue('Grouped chat');
    const allUserItems = fixture.debugElement.queryAll(
      By.css('.user-list .user-list-item')
    );
    allUserItems[0].nativeElement.click();
    const btn = fixture.debugElement.query(By.css('#create-group'));
    btn.nativeElement.click();
    expect(component.creating).toEqual(true);
    expect(component.confirmed.emit).toHaveBeenCalledWith([MOCK_USER1.id]);
  }));
});

const MOCK_USER1 = {
  id: 'id',
  firstName: 'John',
  lastName: 'Snow',
  username: 'johnsnow',
  profile: {
    avatar: {
      src: '',
      src_webp: '',
      alt: 'avatar',
    },
  },
};

const MOCK_USER2 = {
  id: 'id2',
  firstName: 'Tony',
  lastName: 'Stack',
  username: 'tonystack22',
  profile: {
    avatar: {
      src: '',
      src_webp: '',
      alt: 'avatar',
    },
  },
};
