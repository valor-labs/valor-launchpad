import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { CreateGroupModalComponent } from './create-group-modal.component';
import { UiModule } from '@valor-launchpad/ui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatService } from '../chat.service';
import { ChatServiceStub } from '../chat-service-stub';
import { By } from '@angular/platform-browser';
import { HttpModule } from '@valor-launchpad/http';
import { environment } from '../../../../environments/environment';

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
      ],
      declarations: [CreateGroupModalComponent],
      providers: [{ provide: ChatService, useClass: ChatServiceStub }],
    }).compileComponents();
  });

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(CreateGroupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tick(200);
    fixture.detectChanges();
  }));

  it('should create', fakeAsync(() => {
    expect(component).toBeTruthy();
    const allUserItems = fixture.debugElement.queryAll(
      By.css('.user-list .user-list-item')
    );
    expect(allUserItems.length).toEqual(1);
  }));

  it('should fetch users once keyword changes', fakeAsync(() => {
    const chatService = TestBed.inject(ChatService);
    jest.spyOn(chatService, 'searchUser');
    component.keywordSearchControl.setValue('John');
    tick(200);
    expect(chatService.searchUser).toHaveBeenCalled();
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
    component.groupNameControl.setValue('Grouped chat');
    const allUserItems = fixture.debugElement.queryAll(
      By.css('.user-list .user-list-item')
    );
    allUserItems[0].nativeElement.click();
    const btn = fixture.debugElement.query(By.css('#create-group'));
    btn.nativeElement.click();
    expect(component.creating).toEqual(true);
    tick(200);
    expect(component.creating).toEqual(false);
  }));
});
