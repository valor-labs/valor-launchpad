import { Editor, Element, Transforms } from 'slate';

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

export const isMarkActive = (editor: Editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

export const isBlockActive = (editor: Editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: n => !Editor.isEditor(n) && Element.isElement(n) && n.type === format
  });

  return !!match;
};

export const toggleMark = (editor: Editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
}

export const toggleBlock = (editor: Editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: n => LIST_TYPES.includes(Element.isElement(n) && n.type),
    split: true
  });
  const newProperties: Partial<Element> = {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format
  };
  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};
