import {Component, EventEmitter, Input, Output} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

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
  ]
})
export class PropertyPanelComponent {
  @Input() lastEditedButtonId: number | null = null;
  @Input() lastEditedButtonText: string = ''
  @Input() elements: any[] = [];
  @Input() elementType: string = ''
  @Input() fontSize: string = '0'
  @Input() alignItems: string = 'center'
  @Input() letterSpacing: string = '0'
  @Input() lineHeight: string = '0'
  arrayColors: Record<string, string> = {
    color1: '#2883e9',
    color2: '#e920e9',
    color3: 'rgb(255,245,0)',
    color4: 'rgb(236,64,64)',
    color5: 'rgba(45,208,45,1)'
  };
  selectedColor: string = 'color1';
  selectedBackgroundColor: string = 'color2'
  selector!: any
  color: string = "#1976D2";
  opacityValue: string = '100';
  borderRadius: number = 0
  left: string = 'bottom-left'
  showEffectsPanel = false;
  showTypographyPanel = false;
  showBorderPanel = false;
  showSizePanel = false;
  showBackgroundPanel = false;
  isHover: boolean = false

  togglePropertyPanel(showPanel: string) {
    if (showPanel === 'typography') {
      this.showTypographyPanel = !this.showTypographyPanel;
    } else if (showPanel === 'border') {
      this.showBorderPanel = !this.showBorderPanel;
    } else if (showPanel === 'effects') {
      this.showEffectsPanel = !this.showEffectsPanel
    } else if (showPanel === 'size') {
      this.showSizePanel = !this.showSizePanel
    } else if (showPanel === 'background') {
      this.showBackgroundPanel = !this.showBackgroundPanel
    }
  }

  public updateButtonText() {
    if (this.lastEditedButtonId !== null) {
      const editedButton = this.elements.find((element) => element.id === this.lastEditedButtonId);
      if (editedButton) {
        editedButton.text = this.lastEditedButtonText;
      }
    }
  }

  public changeStyle(styleProperty: string, styleValueOverride?: string): any {
    if (this.lastEditedButtonId !== null) {
      const editedSelector = this.elements.find((element) => element.id === this.lastEditedButtonId);
      this.selector = editedSelector;

      let styleValue = styleValueOverride;
      if (!styleValueOverride) {
        styleValue = styleProperty === 'align-items' ? `${this.alignItems}` :
          styleProperty === 'lineHeight' ? `${this.lineHeight}px` :
          styleProperty === 'opacity' ? `${this.opacityValue}%` :
            styleProperty === 'letterSpacing' ? `${this.letterSpacing}px` :
          styleProperty === 'fontSize'
            ? `${this.fontSize}px`
            : styleProperty === 'borderRadius'
              ? `${this.borderRadius}px` :
                styleProperty === 'background' ?
              this.arrayColors[this.selectedBackgroundColor]
              : this.arrayColors[this.selectedColor];
      }

      if (editedSelector) {
        editedSelector.style = {
          ...editedSelector.style,
          [styleProperty]: styleValue
        };
      }
    }
  }
}
