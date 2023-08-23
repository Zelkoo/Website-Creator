import {Component, Input} from '@angular/core';
import {panelStates} from "../../../helper/enums";
import {ChangeStyleService} from "../services-panel/change-style.service";

@Component({
  selector: 'app-size-panel',
  templateUrl: './size-panel.component.html',
  styleUrls: ['./size-panel.component.css']
})
export class SizePanelComponent {
  @Input() lastEditedButtonId: number | null = null;
  @Input() lastEditedButtonText: string = ''
  @Input() elements: any[] = [];
  @Input() elementType: string = ''
  @Input() fontSize: string = '0'
  @Input() alignItems: string = 'center'
  @Input() letterSpacing: string = '0'
  @Input() lineHeight: string = '0'
  @Input() selector: any
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

  public getSizeStyle(property: any) {
    const selector = this.getSelector();
    return this.styleService.getPropertyValue(selector, property)
  }

  public styleValueOverride(element: any, styleProperty: string, styleValueOverride?: string) {
    const selector = this.getSelector();
    this.styleService.changeStyle(selector, styleProperty, `${styleValueOverride}%`)
  }
}
