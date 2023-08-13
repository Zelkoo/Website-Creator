import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import * as ButtonEditorActions from './button-editor.actions';

@Injectable()
export class ButtonEditorEffects {
  addButtonEffect$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ButtonEditorActions.addNewButton),
        tap((action) => console.log('Button added:', action.button))
      ),
    { dispatch: false }
  );
  changeButtonSizeEffect$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ButtonEditorActions.updateButtonStyle ),
        tap((action) => console.log('Button added:', action.buttonIndex))
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions) {}
}
