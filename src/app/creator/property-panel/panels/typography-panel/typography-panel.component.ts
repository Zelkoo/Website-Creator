import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import {panelStates} from "../../../../helper/enums";
import {ChangeStyleService} from "../../services-panel/change-style.service";
import { Store } from '@ngrx/store';
import { BehaviorSubject, debounceTime, map, Subject } from 'rxjs';
import {
  UpdateStyleProperty,
  UpdateTextContent,
} from '../../../../../store/actions';
import { AppState } from '../../../../../store/reducer';
import { ElementProperties } from '../../../../helper/types';

@Component({
  selector: 'app-typography-panel',
  templateUrl: './typography-panel.component.html',
  styleUrls: ['./typography-panel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush


})
export class TypographyPanelComponent implements OnInit, OnDestroy {
  protected readonly panelStates = panelStates;

  private textChangeSubject = new BehaviorSubject<string>('');
  private destroy$ = new Subject<void>();

  private selectProperty<T>(key: keyof ElementProperties) {
    return this.selectedElement$.pipe(map(element => element && element[key]));
  }

  private updateStyleProperty(property: string, value: any) {
    this.store.dispatch(new UpdateStyleProperty({ property, value }));
  }

  selectedElement$ = this.store.select(state =>
    state.app?.elements?.find(e => e.id === state.app?.selectedElementId));

  selectedFontSize$ = this.selectProperty('fontSize');
  selectedFontColor$ = this.selectProperty('color');
  selectedLetterSpacing$ =  this.selectProperty('letterSpacing')
  selectedLineHeight$ = this.selectProperty('lineHeight')
  selectedTextContent$ = this.selectProperty('text')



  constructor(public styleService: ChangeStyleService, private store:  Store<{app: AppState}>) {
    this.textChangeSubject.pipe(
      debounceTime(300)
    ).subscribe(text => {
      this.store.dispatch(new UpdateTextContent(text));
    });
  }

  public changeAlignItems(alignItems: string) {
   this.updateStyleProperty('alignItems', alignItems );
  }
  public changeFontSize(fontSize: number) {
    this.updateStyleProperty('fontSize', fontSize );
  }
  public changeLetterSpacing(letterSpacing: number) {
    this.updateStyleProperty('letterSpacing', letterSpacing );
  }
  public changeLineHeight(lineHeight: number) {
    this.updateStyleProperty('lineHeight', lineHeight );
  }
  public changeFontColor(color: string) {
    this.updateStyleProperty('color', color );
  }
  public changeTextContent(text: string) {
    this.textChangeSubject.next(text);
  }

  public ngOnInit() {
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    console.log(1)
  }

  public openPanel(panelToOpen: string): void {
    this.styleService.togglePropertyPanel(panelToOpen)
  }

}
