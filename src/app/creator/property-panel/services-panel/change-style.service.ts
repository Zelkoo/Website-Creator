import {Injectable, Input} from '@angular/core';
import {panelStates, StyleProperty} from "../../../helper/enums";

@Injectable({
  providedIn: 'root'
})
export class ChangeStyleService {
  @Input() fontSize: string = '0'
  @Input() alignItems: string = 'center'
  @Input() letterSpacing: string = '0'
  @Input() lineHeight: string = '0'
  @Input() selector: any
  @Input() opacityValue: string = '100'
  @Input() borderRadius: string = '0'
  @Input() selectedColor: string = 'color1';
  @Input() selectedBackgroundColor: string = 'color2'
  @Input() arrayColors: Record<string, string> = {
    color1: '#2883e9',
    color2: '#cc3a3a',
    color3: 'rgb(255,245,0)',
    color4: 'rgb(236,64,64)',
    color5: 'rgba(45,208,45,1)'
  };


  constructor() {
  }


  public getPropertyValue(element: any, property: string): string | number {
    if (!element) {
      return ''
    }
    return element.style[property]
  }

  public getStyleValue(element:any, property: string): string {
    if (!element) {
      return ''
    }
    return element.style[property];
  }

  public changeStyle(element: any, styleProperty: string, styleValueOverride?: string): void {
    if (element !== null) {
      this.selector = element
      const styleValue = styleValueOverride || this.getStyleValueByProperty(styleProperty);

      if (this.selector) {
        this.selector.style = {
          ...this.selector.style,
          [styleProperty]: styleValue
        };
      }
    }
  }
  public updateButtonText(element: any, textContent: string): void {
    if (element !== null) {
      this.selector = element
      if (this.selector) {
        this.selector.text = textContent;
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

  public togglePropertyPanel(showPanel: string): void {
    if (panelStates.hasOwnProperty(showPanel)) {
      panelStates[showPanel] = !panelStates[showPanel];
    }
  }

}
