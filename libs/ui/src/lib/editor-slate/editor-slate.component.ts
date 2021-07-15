import { Component, EventEmitter, ViewChild, TemplateRef, OnInit, Input, Output } from '@angular/core';
import { createEditor, Text, Element } from 'slate';
import { withHistory } from 'slate-history';
import { withAngular } from 'slate-angular';
import { EditorSlateTextComponent } from './components/text/editor-slate-text.component';
import './custom-types.model';
import { isBlockActive, isMarkActive, toggleBlock, toggleMark } from './editor-slate.util';
import { ToolbarItem } from './editor-slate.model';
import { ComponentType } from 'slate-angular/types/view';

@Component({
  selector: 'valor-launchpad-editor-slate',
  templateUrl: './editor-slate.component.html',
  styleUrls: ['./editor-slate.component.scss']
})
export class EditorSlateComponent {

  @Input() schema: Element[] = [{ type: 'paragraph', children: [{ text: '' }] }];
  @Output() schemaChange = new EventEmitter<Element[]>();

  editor = withHistory(withAngular(createEditor()));

  toolbarItems: ToolbarItem[] = [
    {
      format: 'bold',
      icon: 'fas fa-bold',
      active: (format) => isMarkActive(this.editor, format),
      action: (format) => toggleMark(this.editor, format)
    },
    {
      format: 'italic',
      icon: 'fas fa-italic',
      active: (format) => isMarkActive(this.editor, format),
      action: (format) => toggleMark(this.editor, format)
    },
    {
      format: 'underlined',
      icon: 'fas fa-underline',
      active: (format) => isMarkActive(this.editor, format),
      action: (format) => toggleMark(this.editor, format)
    },
    {
      format: 'code',
      icon: 'fas fa-code',
      active: (format) => isMarkActive(this.editor, format),
      action: (format) => toggleMark(this.editor, format)
    },
    {
      format: 'heading-one',
      label: 'H1',
      active: (format) => isBlockActive(this.editor, format),
      action: (format) => toggleBlock(this.editor, format)
    },
    {
      format: 'heading-two',
      label: 'H2',
      active: (format) => isBlockActive(this.editor, format),
      action: (format) => toggleBlock(this.editor, format)
    },
    {
      format: 'block-quote',
      icon: 'fas fa-quote-right',
      active: (format) => isBlockActive(this.editor, format),
      action: (format) => toggleBlock(this.editor, format)
    },
    {
      format: 'numbered-list',
      icon: 'fas fa-list-ol',
      active: (format) => isBlockActive(this.editor, format),
      action: (format) => toggleBlock(this.editor, format)
    },
    {
      format: 'bulleted-list',
      icon: 'fas fa-list-ul',
      active: (format) => isBlockActive(this.editor, format),
      action: (format) => toggleBlock(this.editor, format)
    }
  ];

  @ViewChild('heading_1', { read: TemplateRef, static: true })
  private headingOneTemplate: TemplateRef<void>;

  @ViewChild('heading_2', { read: TemplateRef, static: true })
  private headingTwoTemplate: TemplateRef<void>;

  @ViewChild('blockquote', { read: TemplateRef, static: true })
  private blockquoteTemplate: TemplateRef<void>;

  @ViewChild('ul', { read: TemplateRef, static: true })
  private ulTemplate: TemplateRef<void>;

  @ViewChild('ol', { read: TemplateRef, static: true })
  private olTemplate: TemplateRef<void>;

  @ViewChild('li', { read: TemplateRef, static: true })
  private liTemplate: TemplateRef<void>;

  valueChange(event: Element[]) {
    this.schemaChange.emit(event);
  }

  elRenderer = (element: Element) => {
    switch (element.type) {
      case 'heading-one':
        return this.headingOneTemplate;
      case 'heading-two':
        return this.headingTwoTemplate;
      case 'block-quote':
        return this.blockquoteTemplate;
      case 'numbered-list':
        return this.olTemplate;
      case 'bulleted-list':
        return this.ulTemplate;
      case 'list-item':
        return this.liTemplate;
      default:
        return null;
    }
  };

  textRenderer = (text: Text): ComponentType<EditorSlateTextComponent> => {
    if (text['bold'] || text['italic'] || text['code'] || text['underlined']) {
      return EditorSlateTextComponent;
    }
  };

  keydown = (event: KeyboardEvent) => null;
}
