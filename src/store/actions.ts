export enum ActionTypes {
  CREATE_ELEMENT = '[Element] Create Button',
  SELECT_ELEMENT = '[Element] Select Button',
  CHANGE_TEXT_CONTENT = '[Element] Update Text Content',
  UPDATE_ELEMENT_POSITION = '[Element] Update Element Position',
  UPDATE_ELEMENT_SIZE = '[Element] Update Element Size',
  UPDATE_BACKGROUND_COLOR = '[Element] Update Background Color',
  UPDATE_STYLE_PROPERTY = '[Element] Update Style Property'
}

export class CreateButton {
  readonly type = ActionTypes.CREATE_ELEMENT;
}

export class SelectElement {
  readonly type = ActionTypes.SELECT_ELEMENT;
  constructor(public payload: { id: number }) { }
}

export class UpdateStyleProperty {
  readonly type = ActionTypes.UPDATE_STYLE_PROPERTY;
  constructor(public payload: { property: string | number, value: any }) {}
}

export class UpdateTextContent {
  readonly type = ActionTypes.CHANGE_TEXT_CONTENT;

  constructor(public payload: string) { }
}

export class UpdateElementPosition {
  readonly type = ActionTypes.UPDATE_ELEMENT_POSITION
  constructor(public payload: {id: number, x: number, y: number}) {
  }
}
export class UpdateElementSize {
  readonly type = ActionTypes.UPDATE_ELEMENT_SIZE
  constructor(public payload: {id: number, width: number, height: number}) {
  }

}
