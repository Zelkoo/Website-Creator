import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {panelStates} from "../../../../helper/enums";
import {ChangeStyleService} from "../../services-panel/change-style.service";
import { UpdateStyleProperty } from '../../../../../store/actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../store/reducer';
import { map } from 'rxjs';

@Component({
  selector: 'app-effect-panel',
  templateUrl: './effect-panel.component.html',
  styleUrls: ['./effect-panel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class EffectPanelComponent {
    protected readonly panelStates = panelStates;
  private selectedElement$ = this.store.select(state =>
    state.app.elements?.find(e => e.id === state.app.selectedElementId));

  selectedOpacity$ = this.selectedElement$.pipe(
    map(element => element?.opacity)
  )
    constructor(public styleService: ChangeStyleService,  private store:  Store<{app: AppState}>) {
    }


  public openPanel(panelToOpen: string): void {
    this.styleService.togglePropertyPanel(panelToOpen)
  }
  public changeOpacity(opacity: number) {
    this.store.dispatch(new UpdateStyleProperty({ property: 'opacity', value: opacity }));
  }
}
