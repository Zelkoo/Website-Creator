import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {panelStates} from "../../../../helper/enums";
import {ChangeStyleService} from "../../services-panel/change-style.service";
import {  UpdateStyleProperty } from '../../../../../store/actions';
import { map } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../store/reducer';
import { ElementProperties } from '../../../../helper/types';

@Component({
  selector: 'app-background-panel',
  templateUrl: './background-panel.component.html',
  styleUrls: ['./background-panel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class BackgroundPanelComponent {
  protected readonly panelStates = panelStates;
  selectedElement$ = this.store.select(state =>
    state.app?.elements?.find(e => e.id === state.app?.selectedElementId));

  selectedBgColor$ = this.selectProperty('backgroundColor');

  private selectProperty<T>(key: keyof ElementProperties) {
    return this.selectedElement$.pipe(map(element => element && element[key]));
  }
  private updateStyleProperty(property: string, value: any) {
    this.store.dispatch(new UpdateStyleProperty({ property, value }));
  }

  constructor(public styleService: ChangeStyleService, private store:  Store<{app: AppState}>) {
  }

  public openPanel(panelToOpen: string): void {
    this.styleService.togglePropertyPanel(panelToOpen)
  }
  public changeBgColor(bgColor: string) {
    this.updateStyleProperty('backgroundColor', bgColor );
  }
}
