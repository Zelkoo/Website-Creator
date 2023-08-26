import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {panelStates} from "../../../helper/enums";
import {ChangeStyleService} from "../services-panel/change-style.service";
import { UpdateFontSize, UpdateTextContent } from '../../../../store/actions';
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
  elementTextContent!: string
  @Input() fontSize: string = '0'
  @Input() letterSpacing: string = '0'
  @Input() lineHeight: string = '0'
  @Input() elements: any
  @Input() selector: any
  @Input() lastEditedButtonId: any
  @Input() selectedColor: string = 'color1';
  @Input() arrayColors: Record<string, string> = {
    color1: '#2883e9',
    color2: '#e920e9',
    color3: 'rgb(255,245,0)',
    color4: 'rgb(236,64,64)',
    color5: 'rgba(45,208,45,1)'
  };
  elements$ = this.store.select(state => state.app.elements);

  selectedElement$ = this.store.select(state =>
    state.app?.elements?.find(e => e.id === state.app?.selectedElementId));

  selectedFontSize$ = this.selectedElement$.pipe(
    map(element => element?.fontSize)
  );
  selectedTextContent$ = this.selectedElement$.pipe(
    map(element => element?.text)
  );
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

  public changeTextContent(text: string) {
    this.textChangeSubject.next(text);
  }

  public ngOnInit() {
  }

  private getSelector(): any {
    return this.elements.find((element: any) => element.id === this.lastEditedButtonId);
  }

  public openPanel(panelToOpen: string): void {
    this.styleService.togglePropertyPanel(panelToOpen)
  }

  // public styleValueOverride(element: any, styleProperty: string, styleValueOverride?: string) {
  //   const selector = this.getSelector();
  //   this.styleService.changeStyle(selector, styleProperty, `${styleValueOverride}px`)
  // }
  //
  // public changeColor(element: any, styleProperty: string, styleValueOverride?: string) {
  //   const selector = this.getSelector();
  //   this.styleService.changeStyle(selector, styleProperty, styleValueOverride)
  // }
  //
  //
  // public getFontStyle(property: any) {
  //   const selector = this.getSelector();
  //   return this.styleService.getStyleValue(selector, property)
  // }
}
