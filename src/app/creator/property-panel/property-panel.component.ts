import {ChangeDetectionStrategy, Component} from '@angular/core';
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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class PropertyPanelComponent {
  constructor() {
  }
}
