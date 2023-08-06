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
  public isEditMode = true;
  public elements: any[] = [];
  public nextButtonId = 1;
  public lastEditedButtonId: number | null = null;
  public elementType: string = ''

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

    this.elements.push({
      id: this.nextButtonId++,
      style: {
        position: 'absolute',
        left: '250px',
        top: '250px',
        width: '100px',
        height: '50px',
        fontSize: '',
        background: '',
        color: ''
      },
      text: ''
    });
  }



  public onCreateNewButton() {
    this.onEdit(null, null);
  }
}
