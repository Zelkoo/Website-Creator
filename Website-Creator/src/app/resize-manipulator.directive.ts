import {Directive, ElementRef, HostBinding, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appResizeManipulator]'
})
export class ResizeManipulatorDirective {
  @HostBinding('class.resizable') resizable = false;
  @HostBinding('class.resize-corner') resizeCorner = false;
  @HostBinding('class.resize-middle') resizeMiddle = false;
  @Input() isMoving!: boolean;
  private isResizing = false;
  private isDragging = false;
  private originalWidth = 0;
  private originalHeight = 0;
  private originalMouseX = 0;
  private originalMouseY = 0;
  @Input() isEditMode!: boolean
  constructor(private elementRef: ElementRef) {}

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    this.addManipulators();
    event.stopPropagation();
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.isResizing = false;
    this.isDragging = false;
    this.resizable = false;
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    if (targetElement.classList.contains('manipulator')) {
      this.isResizing = true;
      this.originalWidth = this.elementRef.nativeElement.offsetWidth;
      this.originalHeight = this.elementRef.nativeElement.offsetHeight;
      this.originalMouseX = event.clientX;
      this.originalMouseY = event.clientY;
    } else {
      this.isDragging = true;
      this.originalMouseX = event.clientX - this.elementRef.nativeElement.offsetLeft;
      this.originalMouseY = event.clientY - this.elementRef.nativeElement.offsetTop;
    }
  }
// Mousemove block Angular Material Slider animation
  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    event.preventDefault();
    if (this.isResizing) {
      const deltaX = event.clientX - this.originalMouseX;
      const deltaY = event.clientY - this.originalMouseY;
      const newWidth = this.originalWidth + deltaX;
      const newHeight = this.originalHeight + deltaY;
      this.elementRef.nativeElement.style.width = newWidth + 'px';
      this.elementRef.nativeElement.style.height = newHeight + 'px';
    } else if (this.isDragging && this.isEditMode) {
      const newLeft = event.clientX - this.originalMouseX;
      const newTop = event.clientY - this.originalMouseY;
      this.elementRef.nativeElement.style.left = newLeft + 'px';
      this.elementRef.nativeElement.style.top = newTop + 'px';
    }
  }

  private addManipulators() {
    this.resizable = true;
    this.resizeCorner = true;
    this.resizeMiddle = true;
  }

}
