import { EMPTY, map, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ActionTypes, CreateButton, SelectElement } from './actions';
import * as ElementActions from './actions';

@Injectable()
export class MyEffects {
  constructor(
    private actions$: Actions
  ) {}

  // createAndSelectElement$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(ActionTypes.CREATE_ELEMENT),
  //     map((action: ElementActions.CreateButton) => action.payload.id),
  //     map(newId => new SelectElement({ id: newId })),
  //   )
  // );
}
