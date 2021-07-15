export type MarkTypes =
  | 'bold'
  | 'italic'
  | 'underlined'
  | 'strike'
  | 'code';

export type BlockTypes =
  | 'heading-one'
  | 'heading-two'
  | 'block-quote'
  | 'numbered-list'
  | 'bulleted-list';

interface ToolbarMarkItem<T = MarkTypes> {
  format: T;
  icon?: string;
  label?: string;
  active: (format: T) => boolean;
  action: (format: T) => void;
}

interface ToolbarBlockItem<T = BlockTypes> {
  format: T;
  icon?: string;
  label?: string;
  active: (format: T) => boolean;
  action: (format: T) => void;
}

export type ToolbarItem = ToolbarMarkItem | ToolbarBlockItem;
