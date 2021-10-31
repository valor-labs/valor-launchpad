import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '@valor-launchpad/ui';
import { FormsModule } from '@angular/forms';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { CommentItemComponent } from './components/comment-item/comment-item.component';

@NgModule({
  imports: [CommonModule, UiModule, FormsModule],
  declarations: [CommentListComponent, CommentItemComponent],
  exports: [CommentListComponent, CommentItemComponent],
})
export class CommentModule {}
