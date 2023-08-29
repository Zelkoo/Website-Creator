import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {panelStates} from "../../../helper/enums";
import {ChangeStyleService} from "../services-panel/change-style.service";
import { UpdateBgColor, UpdateFontColor } from '../../../../store/actions';
import { map } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/reducer';

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

  selectedBgColor$ = this.selectedElement$.pipe(
    map(element => element?.backgroundColor)
  )
  constructor(public styleService: ChangeStyleService, private store:  Store<{app: AppState}>) {
  }

  public openPanel(panelToOpen: string): void {
    this.styleService.togglePropertyPanel(panelToOpen)
  }
  public changeBgColor(bgColor: string) {
    this.store.dispatch(new UpdateBgColor(bgColor))
  }
}
