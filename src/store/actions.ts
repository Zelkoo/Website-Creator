export enum ActionTypes {
  CREATE_ELEMENT = '[App] Create Button',
  SELECT_ELEMENT = '[App] Select Button',
  UPDATE_FONT_SIZE = '[App] Update Font Size',
  CHANGE_TEXT_CONTENT = '[App] Update Text Content',
  UPDATE_ELEMENT_POSITION = '[App] Update Element Position',
  UPDATE_FONT_COLOR = '[App] Update Font Color',
  UPDATE_LETTER_SPACING = '[App] Update Letter Spacing',
  UPDATE_LINE_HEIGHT = '[App] Update Line Height'
}

export class CreateButton {
  readonly type = ActionTypes.CREATE_ELEMENT;
}

export class SelectElement {
  readonly type = ActionTypes.SELECT_ELEMENT;
  constructor(public payload: { id: number }) { }
}

export class UpdateFontSize {
  readonly type = ActionTypes.UPDATE_FONT_SIZE;

  constructor(public payload: number) { }
}
export class UpdateTextContent {
  readonly type = ActionTypes.CHANGE_TEXT_CONTENT;

  constructor(public payload: string) { }
}
export class UpdateFontColor {
  readonly type = ActionTypes.UPDATE_FONT_COLOR;

  constructor(public payload: string) { }
}
export class UpdateLetterSpacing {
  readonly type = ActionTypes.UPDATE_LETTER_SPACING;
  constructor(public payload: number) { }
}
export class UpdateLineHeight {
  readonly type = ActionTypes.UPDATE_LINE_HEIGHT;
  constructor(public payload: number) { }
}
export class UpdateElementPosition {
  readonly type = ActionTypes.UPDATE_ELEMENT_POSITION
  constructor(public payload: {id: number, x: number, y: number}) {
  }
}
