import {
  Component,
  EventEmitter,
  ViewChild,
  TemplateRef,
  Input,
  Output,
  HostBinding,
  ElementRef,
} from '@angular/core';
import { createEditor, Text, Element, Transforms, Editor } from 'slate';
import { withHistory } from 'slate-history';
import {
  AngularEditor,
  BaseElementComponent,
  withAngular,
} from 'slate-angular';
import { EditorSlateTextComponent } from './components/text/editor-slate-text.component';
import './custom-types.model';
import {
  isBlockActive,
  isMarkActive,
  toggleBlock,
  toggleMark,
} from './editor-slate.util';
import { ToolbarItem } from './editor-slate.model';
import { ComponentType } from 'slate-angular/types/view';
import { ImageElement } from './custom-types.model';

const withImage = (editor: AngularEditor) => {
  const { isVoid } = editor;
  editor.isVoid = (element) => {
    return element.type === 'image' || isVoid(element);
  };
  return editor;
};

@Component({
  selector: 'valor-launchpad-editor-slate',
  templateUrl: './editor-slate.component.html',
  styleUrls: ['./editor-slate.component.scss'],
})
export class EditorSlateComponent {
  @Input() @HostBinding('class.borderless') borderless = false;
  @Input() @HostBinding('class.readonly') readonly = false;
  @Input() hideToolbar = false;
  @Input() schema: Element[] = [
    { type: 'paragraph', children: [{ text: '' }] },
  ];
  @Input() preventEnter = false;
  @Output() enterClicked = new EventEmitter();
  @Output() schemaChange = new EventEmitter<Element[]>();

  editor = withHistory(withImage(withAngular(createEditor())));

  toolbarItems: ToolbarItem[] = [
    {
      format: 'bold',
      icon: 'fas fa-bold',
      active: (format) => isMarkActive(this.editor, format),
      action: (format) => toggleMark(this.editor, format),
    },
    {
      format: 'italic',
      icon: 'fas fa-italic',
      active: (format) => isMarkActive(this.editor, format),
      action: (format) => toggleMark(this.editor, format),
    },
    {
      format: 'underlined',
      icon: 'fas fa-underline',
      active: (format) => isMarkActive(this.editor, format),
      action: (format) => toggleMark(this.editor, format),
    },
    {
      format: 'code',
      icon: 'fas fa-code',
      active: (format) => isMarkActive(this.editor, format),
      action: (format) => toggleMark(this.editor, format),
    },
    {
      format: 'heading-one',
      label: 'H1',
      active: (format) => isBlockActive(this.editor, format),
      action: (format) => toggleBlock(this.editor, format),
    },
    {
      format: 'heading-two',
      label: 'H2',
      active: (format) => isBlockActive(this.editor, format),
      action: (format) => toggleBlock(this.editor, format),
    },
    {
      format: 'block-quote',
      icon: 'fas fa-quote-right',
      active: (format) => isBlockActive(this.editor, format),
      action: (format) => toggleBlock(this.editor, format),
    },
    {
      format: 'numbered-list',
      icon: 'fas fa-list-ol',
      active: (format) => isBlockActive(this.editor, format),
      action: (format) => toggleBlock(this.editor, format),
    },
    {
      format: 'bulleted-list',
      icon: 'fas fa-list-ul',
      active: (format) => isBlockActive(this.editor, format),
      action: (format) => toggleBlock(this.editor, format),
    },
    {
      format: 'image',
      icon: 'far fa-fw fa-image',
      active: () => false,
      action: (format) => {
        // create a file input
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.addEventListener('change', () => {
          const file = input.files[0];
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            const imageNode: ImageElement = {
              type: 'image',
              url: reader.result as string,
              children: [
                {
                  text: '',
                },
              ],
            };
            console.log(imageNode);
            Transforms.insertNodes(this.editor, imageNode);
          };
          reader.onerror = () => {
            console.log('there are some problems');
          };
        });
        input.click();
        // trigger click
      },
    },
  ];

  get isEmpty() {
    return (
      this.schema.length === 1 &&
      this.schema[0].children.length === 1 &&
      (this.schema[0].children[0] as any).text === ''
    );
  }

  constructor(private el: ElementRef) {}

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

  clear() {
    Transforms.delete(this.editor, {
      at: {
        anchor: Editor.start(this.editor, []),
        focus: Editor.end(this.editor, []),
      },
    });
  }

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
      case 'image':
        return SlateImageComponent;
      default:
        return null;
    }
  };

  textRenderer = (text: Text): ComponentType<EditorSlateTextComponent> => {
    if (text['bold'] || text['italic'] || text['code'] || text['underlined']) {
      return EditorSlateTextComponent;
    }
  };

  keydown = (event: KeyboardEvent) => {
    if (this.preventEnter) {
      if (event.key === 'Enter') {
        if (event.altKey) {
          this.editor.insertBreak();
        } else {
          event.preventDefault();
          this.enterClicked.emit();
        }
      }
    }
  };
}

@Component({
  selector: 'valor-launchpad-element-image',
  template: `
    <slate-children
      [children]="children"
      [context]="childrenContext"
      [viewContext]="viewContext"
    ></slate-children>
    <img [src]="element.url" alt="" [class.outline]="selection" />
  `,
  styles: [
    `
      :host img {
        max-width: 100%;
      }
      :host img.outline{
        box-shadow: 0 0 0 2px #348fe4;
      }
    `,
  ],
})
export class SlateImageComponent extends BaseElementComponent<ImageElement> {}
