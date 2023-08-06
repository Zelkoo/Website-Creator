import {Component, Input, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {ButtonEditorState} from "../../store/button-editor.state";
import {InteractHandlerService} from "../services/interact-handler";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";

@Component({
  selector: 'creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.css'],
})
export class CreatorComponent implements OnInit {
  @Input()
  model: any;
  @Input()
  elementType: string = ''
  isEditMode = true;
  buttons: any[] = [];
  nextButtonId = 1;
  lastEditedButtonId: number | null = null;
  lastEditedButtonText: string = '';
  style: object = {};
  color: string = '#FFDC7D'
  selector!: any
  fontSize: number = 16
  borderRadius: number = 0
  arrayColors: Record<string, string> = {
    color1: '#2883e9',
    color2: '#e920e9',
    color3: 'rgb(255,245,0)',
    color4: 'rgb(236,64,64)',
    color5: 'rgba(45,208,45,1)'
  };
  selectedColor: string = 'color1';

  constructor(private store: Store<ButtonEditorState>, private interactHandler: InteractHandlerService, private afAuth: AngularFireAuth,  private router: Router) {
  }

  public ngOnInit() {
    this.interactHandler.setupResizableAndDraggable('.resizable-draggable');
  }

  onEdit($event: any, buttonId: number | null) {
    if ($event?.target) {
      this.elementType = ($event.target as HTMLElement).tagName
    }
    this.lastEditedButtonId = buttonId;

    if (buttonId) {
      return;
    }

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
  }

  public updateButtonText() {
    if (this.lastEditedButtonId !== null) {
      const editedButton = this.buttons.find((button) => button.id === this.lastEditedButtonId);
      if (editedButton) {
        editedButton.text = this.lastEditedButtonText;
      }
    }
  }

  public changeStyle(styleProperty: string): any {
    if (this.lastEditedButtonId !== null) {
      const editedSelector = this.buttons.find((button) => button.id === this.lastEditedButtonId);
      this.selector = editedSelector
      const styleValue =
        styleProperty === 'fontSize'
          ? `${this.fontSize}px`
          : styleProperty === 'borderRadius'
            ? `${this.borderRadius}px`
            : this.arrayColors[this.selectedColor];
      if (editedSelector) {
        editedSelector.style = {
          ...editedSelector.style,
          [styleProperty]: styleValue
        };
      }
    }
  }

  public onCreateNewButton() {
    this.onEdit(null, null);
  }
}
