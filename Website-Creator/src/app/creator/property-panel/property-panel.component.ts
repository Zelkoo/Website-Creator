import {Component, Input} from '@angular/core';
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

  arrayColors: Record<string, string> = {
    color1: '#2883e9',
    color2: '#e920e9',
    color3: 'rgb(255,245,0)',
    color4: 'rgb(236,64,64)',
    color5: 'rgba(45,208,45,1)'
  };
  selectedColor: string = 'color1';
  selector!: any
  color: string = "#1976D2";

  borderRadius: number = 0
  left: string = 'bottom-left'

  showTypographyPanel = false;

  togglePropertyPanel() {
    this.showTypographyPanel = !this.showTypographyPanel;
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
          styleProperty === 'fontSize'
            ? `${this.fontSize}px`
            : styleProperty === 'borderRadius'
              ? `${this.borderRadius}px`
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
