import {Component} from '@angular/core';

@Component({
  selector: 'resize',
  templateUrl: './resize.component.html',
  styleUrls: ['./resize.component.css'],
})
export class ResizeComponent{
  public onResizeHandleClick(event: MouseEvent) {
    event.stopPropagation();
  }
}
