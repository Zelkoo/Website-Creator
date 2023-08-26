import { createAction, props } from '@ngrx/store';
import * as readline from 'readline';

export enum ActionTypes {
  CREATE_ELEMENT = '[App] Create Button',
  SELECT_ELEMENT = '[App] Select Button',
  UPDATE_FONT_SIZE = '[App] Update Font Size',
  CHANGE_TEXT_CONTENT = '[App] Update Text Content',
  UPDATE_ELEMENT_POSITION = '[App] Update Element Position'
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

export class UpdateElementPosition {
  readonly type = ActionTypes.UPDATE_ELEMENT_POSITION
  constructor(public payload: {id: number, x: number, y: number}) {
  }
}
