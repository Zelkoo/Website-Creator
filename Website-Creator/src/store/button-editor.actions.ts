import { createAction, props } from '@ngrx/store';
import {Button, ButtonStyle} from './button-editor.state';

export const addNewButton = createAction('[Button Editor] Add New Button', props<{ button: Button }>());
export const updateButtonStyle = createAction(
  '[Button Editor] Update Button Style',
  props<{ buttonIndex: number; style: ButtonStyle }>()
);
