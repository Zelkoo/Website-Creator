import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {panelStates} from "../../../helper/enums";
import {ChangeStyleService} from "../services-panel/change-style.service";

@Component({
  selector: 'app-border-panel',
  templateUrl: './border-panel.component.html',
  styleUrls: ['./border-panel.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush

})
export class BorderPanelComponent {
  protected readonly panelStates = panelStates;

  @Input() elements: any
  @Input() borderRadius!: string
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
  constructor(public styleService: ChangeStyleService) {
  }
  private getSelector(): any {
    return this.elements.find((element: any) => element.id === this.lastEditedButtonId);
  }

  public openPanel(panelToOpen: string): void {
    this.styleService.togglePropertyPanel(panelToOpen)
  }

  public getBorderStyle(property: any) {
    const selector = this.getSelector();
    return this.styleService.getStyleValue(selector, property)
  }

  public styleValueOverride(element: any, styleProperty: string, styleValueOverride?: string) {
    const selector = this.getSelector();
    this.styleService.changeStyle(selector, styleProperty, `${styleValueOverride}px`)
  }
}
