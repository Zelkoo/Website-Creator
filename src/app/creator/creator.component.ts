import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren
} from "@angular/core";
import {Store} from "@ngrx/store";
import {ButtonEditorState} from "../../store/button-editor.state";
import {InteractHandlerService} from "../services/interact-handler";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import interact from "interactjs";
import {FileUpload} from "./file-upload/file-upload";
import {FileUploadService} from "./file-upload/file-upload.service";

@Component({
  selector: 'creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.css'],
})
export class CreatorComponent implements OnInit, AfterViewInit {
  @ViewChild('.dropzone')
  public isEditMode = true;
  public elements: any[] = [];
  public nextButtonId = 1;
  public lastEditedButtonId: number | null = null;
  public elementType: string = ''

  constructor(private uploadService: FileUploadService,private store: Store<ButtonEditorState>, private interactHandler: InteractHandlerService, private afAuth: AngularFireAuth, private renderer: Renderer2, private router: Router) {
  }
  public onElementClick(): any {
    if (this.lastEditedButtonId !== null) {
      console.log(this.elements[this.lastEditedButtonId - 1])

    }
  }

  public ngOnInit() {
  }
  public ngAfterViewInit() {
  this.interactHandler.setupResizableAndDraggable('.draggable', '.dropzone');
}

 onEdit($event: any, buttonId: number | null) {
    if ($event?.target) {
      this.elementType = ($event.target as HTMLElement).tagName

    }
    this.lastEditedButtonId = buttonId;
    if (buttonId) {
      return;
    }
    this.lastEditedButtonId = this.elements.find((e) => e.id)

    this.elements.push({
      id: this.nextButtonId++,
      isHover: false,
      style: {
        position: 'absolute',
        left: '700px',
        top: '250px',
        width: '100px',
        height: '50px',
        fontSize: '15',
        background: '#2883E9',
        color: '#fff',
        border: '0',
        borderRadius: '0',
        letterSpacing: '0',
        lineHeight: null
      },
      text: 'New Element'
    });
  }



  public onCreateNewButton() {
    this.onEdit(null, null);
  }
}
