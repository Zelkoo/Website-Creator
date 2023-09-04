import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {panelStates} from "../../../../helper/enums";
import {ChangeStyleService} from "../../services-panel/change-style.service";
import { map } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../store/reducer';
import { UpdateStyleProperty } from '../../../../../store/actions';

@Component({
  selector: 'app-size-panel',
  templateUrl: './size-panel.component.html',
  styleUrls: ['./size-panel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class SizePanelComponent {
  protected readonly panelStates = panelStates;
  private selectedElement$ = this.store.select(state =>
    state.app?.elements?.find(e => e.id === state.app?.selectedElementId));

  selectedBorderRadius$ = this.selectedElement$.pipe(
    map(element => element?.borderRadius)
  )
  constructor(public styleService: ChangeStyleService, private store:  Store<{app: AppState}>) {
  }


  public openPanel(panelToOpen: string): void {
    this.styleService.togglePropertyPanel(panelToOpen)
  }
  public changeBorderRadius(borderRadius: number) {
    this.store.dispatch(new UpdateStyleProperty({ property: 'borderRadius', value: borderRadius }));
  }
}
