import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appMoveManipulator]'
})
export class MoveManipulatorDirective {
  @Input() isMoving!: boolean;
  private originalX = 0;
  private originalY = 0;
  constructor(private elementRef: ElementRef) {}

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): any {
    const targetElement = event.target as HTMLElement;
    if ( targetElement.classList.contains('resize-handle-left') ||
      targetElement.classList.contains('resize-handle-top') ||
      targetElement.classList.contains('resize-handle-right') ||
      targetElement.classList.contains('resize-handle-bottom')) {
      return
    } else {
      this.isMoving = true;
      this.originalX = event.clientX - this.elementRef.nativeElement.offsetLeft;
      this.originalY = event.clientY - this.elementRef.nativeElement.offsetTop;
    }

  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isMoving) {
      const newX = event.clientX - this.originalX;
      const newY = event.clientY - this.originalY;
      this.elementRef.nativeElement.style.left = newX + 'px';
      this.elementRef.nativeElement.style.top = newY + 'px';
    }
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.isMoving = false;
  }
}
