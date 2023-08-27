import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {panelStates} from "../../../helper/enums";
import {ChangeStyleService} from "../services-panel/change-style.service";
import {
  UpdateFontColor,
  UpdateFontSize,
  UpdateLetterSpacing,
  UpdateLineHeight,
  UpdateTextContent,
} from '../../../../store/actions';
import { AppState } from '../../../../store/reducer';
import { Store } from '@ngrx/store';
import { BehaviorSubject, debounceTime, map } from 'rxjs';

@Component({
  selector: 'app-typography-panel',
  templateUrl: './typography-panel.component.html',
  styleUrls: ['./typography-panel.component.css'],
})
export class TypographyPanelComponent implements OnInit {
  protected readonly panelStates = panelStates;

  selectedElement$ = this.store.select(state =>
    state.app?.elements?.find(e => e.id === state.app?.selectedElementId));

  selectedFontSize$ = this.selectedElement$.pipe(
    map(element => element?.fontSize)
  );

  selectedFontColor$ = this.selectedElement$.pipe(
    map(element => element?.color)
  )

  selectedTextContent$ = this.selectedElement$.pipe(
    map(element => element?.text)
  );

  selectedLetterSpacing$ = this.selectedElement$.pipe(
    map(element => element?.letterSpacing)
  )
  selectedLineHeight$ = this.selectedElement$.pipe(
    map(element => element?.lineHeight)
  )
  private textChangeSubject = new BehaviorSubject<string>('');

  constructor(public styleService: ChangeStyleService, private store:  Store<{app: AppState}>) {
    this.textChangeSubject.pipe(
      debounceTime(300)
    ).subscribe(text => {
      this.store.dispatch(new UpdateTextContent(text));
    });
  }

  public changeFontSize(fontSize: number) {
    this.store.dispatch(new UpdateFontSize(fontSize));
  }
  public changeLetterSpacing(letterSpacing: number) {
    this.store.dispatch(new UpdateLetterSpacing(letterSpacing));
  }
  public changeLineHeight(lineHeight: number) {
    this.store.dispatch(new UpdateLineHeight(lineHeight))
  }
  public changeFontColor(color: string) {
    this.store.dispatch(new UpdateFontColor(color))
  }
  public changeTextContent(text: string) {
    this.textChangeSubject.next(text);
  }

  public ngOnInit() {
  }

  public openPanel(panelToOpen: string): void {
    this.styleService.togglePropertyPanel(panelToOpen)
  }

}
