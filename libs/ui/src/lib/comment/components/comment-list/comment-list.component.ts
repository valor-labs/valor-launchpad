import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommentItem } from '../../models';

@Component({
  selector: 'valor-launchpad-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent {
  @Input() comments: CommentItem[] = [];
  @Output() reply = new EventEmitter();
  @Output() like = new EventEmitter<CommentItem>();
  @Output() unlike = new EventEmitter<CommentItem>();
  @Output() delete = new EventEmitter<CommentItem>();
  replyingComment: CommentItem | null = null;

  resetReply(emitEvent = true) {
    if (emitEvent) {
      this.reply.emit(null);
    }
    this.replyingComment = null;
  }
}
