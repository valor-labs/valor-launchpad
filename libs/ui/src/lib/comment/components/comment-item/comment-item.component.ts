import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommentItem } from '../../models/comment.model';

@Component({
  selector: 'valor-launchpad-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
})
export class CommentItemComponent {
  @Input() comment!: CommentItem;
  @Input() dense = false;
  @Output() reply = new EventEmitter<CommentItem>();
  @Output() like = new EventEmitter<CommentItem>();
  @Output() unlike = new EventEmitter<CommentItem>();
  @Output() delete = new EventEmitter<CommentItem>();

  @HostBinding('class.d-flex')
  @HostBinding('class.align-items-start')
  private basicClass = true;

  onLikeOrUnlike() {
    if (this.comment.liked) {
      this.unlike.emit(this.comment);
    } else {
      this.like.emit(this.comment);
    }
  }
}
