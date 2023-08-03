import {Component, OnDestroy, OnInit} from '@angular/core';
import {ResizeEvent} from "angular-resizable-element";
import { Store} from "@ngrx/store";
import * as ButtonEditorActions from '../store/button-editor.actions';

import {Button, ButtonEditorState} from "../store/button-editor.state";
import {Subscription} from "rxjs";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent{
  isEditMode = true;
  buttons: any[] = [];
  nextButtonId = 1;
  lastEditedButtonId: number | null = null;
  lastEditedButtonText: string = '';
  style: object = {};
  fontSize: number = 16
  isChecked: boolean = false;
  color: string = '#2889e9'
  background: string = '';
  fontColor: string = ''
  arrayColors: Record<string, string> = {
    color1: '#2883e9',
    color2: '#e920e9',
    color3: 'rgb(255,245,0)',
    color4: 'rgb(236,64,64)',
    color5: 'rgba(45,208,45,1)'
  };
  selectedColor: string = 'color1';
  constructor(private store: Store<ButtonEditorState>) {}

  public validate(event: ResizeEvent): boolean {
    const MIN_DIMENSIONS_PX: number = 50;
    if (
      event.rectangle.width &&
      event.rectangle.height &&
      (event.rectangle.width < MIN_DIMENSIONS_PX ||
        event.rectangle.height < MIN_DIMENSIONS_PX)
    ) {
      return false;
    }
    return true;
  }
  public onResizeEnd(event: ResizeEvent, buttonIndex: number): void {
    const style = {
      position: 'fixed',
      left: `${event.rectangle.left}px`,
      top: `${event.rectangle.top}px`,
      width: `${event.rectangle.width}px`,
      height: `${event.rectangle.height}px`,
      fontSize: `${this.fontSize.toString()}px`,
      background: this.background,
      color: this.fontColor
    };
    this.buttons[buttonIndex].style = style;
    this.store.dispatch(ButtonEditorActions.updateButtonStyle({ buttonIndex, style }));
  }

  onEdit($event: any, buttonId: number | null) {
    this.lastEditedButtonId = buttonId;
    this.lastEditedButtonText = this.buttons.find((button) => button.id === buttonId)?.text;
    this.lastEditedButtonText = this.buttons.find((button) => button.id === buttonId)?.fontSize;
    this.lastEditedButtonText = this.buttons.find((button) => button.id === buttonId)?.background;
    this.lastEditedButtonText = this.buttons.find((button) => button.id === buttonId)?.color


    if (buttonId) {
      return;
    }
    const newButton: Button = {
      id: this.nextButtonId++,
      style: {
        position: 'fixed',
        left: '0',
        top: '0',
        width: '100px',
        height: '50px',
        fontSize: '',
        background: '',
        color: ''
      },
      text: '',
    };
    this.buttons.push({
      id: this.nextButtonId++,
      style: {
        position: 'fixed',
        left: '0',
        top: '0',
        width: '100px',
        height: '50px',
        fontSize: '',
        background: '',
        color: ''
      },
      text: ''
    });

    this.store.dispatch(ButtonEditorActions.addNewButton({ button: newButton }));



  }
  public updateButtonText() {
    if (this.lastEditedButtonId !== null) {
      const editedButton = this.buttons.find((button) => button.id === this.lastEditedButtonId);
      if (editedButton) {
        editedButton.text = this.lastEditedButtonText;
      }
    }
  }
  public changeBg(): any {
    if (this.lastEditedButtonId !== null) {
      const editedButton = this.buttons.find((button) => button.id === this.lastEditedButtonId);
      if (editedButton) {
        const updatedStyle = {
          ...editedButton.style,
          background: this.arrayColors[this.selectedColor],
        };
        editedButton.style = updatedStyle;
        this.store.dispatch(ButtonEditorActions.updateButtonStyle({ buttonIndex: this.lastEditedButtonId, style: editedButton.style }))
      }
    }
  }
  public changeFont(): any {
    if (this.lastEditedButtonId !== null) {
      const editedButton = this.buttons.find((button) => button.id === this.lastEditedButtonId);
      if (editedButton) {
        const updatedStyle = {
          ...editedButton.style,
          color: this.arrayColors[this.selectedColor],
        };
        editedButton.style = updatedStyle;
        this.store.dispatch(ButtonEditorActions.updateButtonStyle({ buttonIndex: this.lastEditedButtonId, style: editedButton.style }))
      }
    }
  }
  public updateButtonFontSize(event: any) {
    const value = event.target.value;
    if (this.lastEditedButtonId !== null) {
      const editedButton = this.buttons.find((button) => button.id === this.lastEditedButtonId);
      if (editedButton) {
        const updatedStyle = {
          ...editedButton.style,
          fontSize: value + 'px',
        };
        editedButton.style = updatedStyle;
        this.store.dispatch(ButtonEditorActions.updateButtonStyle({ buttonIndex: this.lastEditedButtonId, style: editedButton.style })); // Aktualizacja akcją w Redux Store

      }
    }
  }

  public onCreateNewButton() {
    this.onEdit(null, null);
  }
}
