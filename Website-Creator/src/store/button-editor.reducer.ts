import { createReducer, on } from '@ngrx/store';
import * as ButtonEditorActions from './button-editor.actions';
import { initialButtonEditorState } from './button-editor.state';

export const buttonEditorReducer = createReducer(
  initialButtonEditorState,
  on(ButtonEditorActions.addNewButton, (state, { button }) => ({
    ...state,
    buttons: [...state.buttons, button],
  })),
  on(ButtonEditorActions.updateButtonStyle, (state, { buttonIndex, style }) => {
    const updatedButtons = state.buttons.map((button, index) =>
      index === buttonIndex ? { ...button, style } : button
    );
    return { ...state, buttons: updatedButtons };
  })
);
