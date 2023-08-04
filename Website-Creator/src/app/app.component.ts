import {Component, Input, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as ButtonEditorActions from '../store/button-editor.actions';
import {Button, ButtonEditorState} from "../store/button-editor.state";
import {InteractHandlerService} from "./services/interact-handler";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @Input()
  model: any;
  @Input()
  options: any;
  isEditMode = true;
  buttons: any[] = [];
  nextButtonId = 1;
  lastEditedButtonId: number | null = null;
  lastEditedButtonText: string = '';
  style: object = {};
  fontSize: number = 16
  color: string = '#2889e9'
  background: string = '';

  arrayColors: Record<string, string> = {
    color1: '#2883e9',
    color2: '#e920e9',
    color3: 'rgb(255,245,0)',
    color4: 'rgb(236,64,64)',
    color5: 'rgba(45,208,45,1)'
  };

  selectedColor: string = 'color1';

  constructor(private store: Store<ButtonEditorState>, private interactHandler: InteractHandlerService) {
  }

  public ngOnInit() {
    this.interactHandler.setupResizableAndDraggable('.resizable-draggable');
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

    this.store.dispatch(ButtonEditorActions.addNewButton({button: newButton}));


  }

  public updateButtonText() {
    if (this.lastEditedButtonId !== null) {
      const editedButton = this.buttons.find((button) => button.id === this.lastEditedButtonId);
      if (editedButton) {
        editedButton.text = this.lastEditedButtonText;
      }
    }
  }

  public changeStyle(): any {
    if (this.lastEditedButtonId !== null) {
      const editedButton = this.buttons.find((button) => button.id === this.lastEditedButtonId);
      if (editedButton) {
        const updatedStyle = {
          ...editedButton.style,
          background: this.arrayColors[this.selectedColor]
        };
        editedButton.style = updatedStyle;
        this.store.dispatch(ButtonEditorActions.updateButtonStyle({
          buttonIndex: this.lastEditedButtonId,
          style: editedButton.style
        }))
      }
    }
  }

  public onCreateNewButton() {
    this.onEdit(null, null);
  }
}
