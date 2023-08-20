import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {panelStates, StyleProperty} from "../../helper/enums";
import {Selector} from "../../helper/interfaces";

@Component({
  selector: 'app-property-panel',
  templateUrl: './property-panel.component.html',
  styleUrls: ['./property-panel.component.css'],
  animations: [
    trigger('styleMenuState', [
      state('open', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      state('closed', style({
        opacity: 0,
        transform: 'translateX(-100%)',
        display: 'none'
      })),
      transition('open <=> closed', animate('900ms ease-in-out'))
    ]),
    trigger('styleMenuState1', [
      state('open', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      state('closed', style({
        opacity: 0,
        transform: 'translateX(-100%)',
        display: 'none'
      })),
      transition('open <=> closed', animate('900ms ease-in-out'))
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class PropertyPanelComponent {
  protected readonly panelStates = panelStates;

  @Input() lastEditedButtonId: number | null = null;
  @Input() lastEditedButtonText: string = ''
  @Input() elements: any[] = [];
  @Input() elementType: string = ''
  @Input() fontSize: string = '0'
  @Input() alignItems: string = 'center'
  @Input() letterSpacing: string = '0'
  @Input() lineHeight: string = '0'

  selectedColor: string = 'color1';
  selectedBackgroundColor: string = 'color2'
  selector!: Selector
  opacityValue: string = '100';
  borderRadius: number = 0
  arrayColors: Record<string, string> = {
    color1: '#2883e9',
    color2: '#e920e9',
    color3: 'rgb(255,245,0)',
    color4: 'rgb(236,64,64)',
    color5: 'rgba(45,208,45,1)'
  };

  public togglePropertyPanel(showPanel: string): void {
    if (panelStates.hasOwnProperty(showPanel)) {
      panelStates[showPanel] = !panelStates[showPanel];
    }
  }

  public changeStyle(styleProperty: string, styleValueOverride?: string): void {
    if (this.lastEditedButtonId !== null) {
      this.selector = this.elements.find((element) => element.id === this.lastEditedButtonId);
      const styleValue = styleValueOverride || this.getStyleValueByProperty(styleProperty);

      if (this.selector) {
        this.selector.style = {
          ...this.selector.style,
          [styleProperty]: styleValue
        };
      }
    }
  }

  private getStyleValueByProperty(styleProperty: string): string {
    const styleMap: Record<StyleProperty, string> = {
      [StyleProperty.AlignItems]: `${this.alignItems}`,
      [StyleProperty.LineHeight]: `${this.lineHeight}px`,
      [StyleProperty.Opacity]: `${this.opacityValue}%`,
      [StyleProperty.LetterSpacing]: `${this.letterSpacing}px`,
      [StyleProperty.FontSize]: `${this.fontSize}px`,
      [StyleProperty.BorderRadius]: `${this.borderRadius}px`,
      [StyleProperty.Background]: this.arrayColors[this.selectedBackgroundColor],
      [StyleProperty.Color]: this.arrayColors[this.selectedColor],
    };

    return styleMap[styleProperty as StyleProperty];
  }

}
