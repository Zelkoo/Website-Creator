import {Injectable} from '@angular/core';
import {panelStates} from "../../../helper/enums";

@Injectable({
  providedIn: 'root'
})
export class ChangeStyleService {
  constructor() {
  }

  public togglePropertyPanel(showPanel: string): void {
    if (panelStates.hasOwnProperty(showPanel)) {
      panelStates[showPanel] = !panelStates[showPanel];
    }
  }

}
