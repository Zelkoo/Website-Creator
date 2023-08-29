import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {panelStates} from "../../../helper/enums";
import {ChangeStyleService} from "../services-panel/change-style.service";

@Component({
  selector: 'app-effect-panel',
  templateUrl: './effect-panel.component.html',
  styleUrls: ['./effect-panel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class EffectPanelComponent {
    @Input() elements: any
    @Input() selector: any
    @Input() lastEditedButtonId: any
    @Input() opacityValue: any
    protected readonly panelStates = panelStates;

    constructor(public styleService: ChangeStyleService) {
    }

  private getSelector(): any {
    return this.elements.find((element: any) => element.id === this.lastEditedButtonId);
  }

  public openPanel(panelToOpen: string): void {
    this.styleService.togglePropertyPanel(panelToOpen)
  }

  public getOpacityStyle(property: any) {
    const selector = this.getSelector();
    return this.styleService.getPropertyValue(selector, property)
  }

  public styleValueOverride(element: any, styleProperty: string, styleValueOverride?: string) {
    const selector = this.getSelector();
    this.styleService.changeStyle(selector, styleProperty, `${styleValueOverride}%`)
  }
}
