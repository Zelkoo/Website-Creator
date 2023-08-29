import {
  AfterViewInit, ChangeDetectionStrategy,
  Component,
  HostListener,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {Store} from "@ngrx/store";
import {InteractHandlerService} from "../services/interact-handler";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {FileUploadService} from "./file-upload/file-upload.service";
import { AppState } from '../../store/reducer';
import { CreateButton, SelectElement } from '../../store/actions';
import { map } from 'rxjs';

@Component({
  selector: 'creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreatorComponent implements AfterViewInit {
  @ViewChild('.dropzone')
  public isEditMode = true;
  public elements: any[] = [];
  public lastEditedButtonId: number | null = null;
  public elementType: string = ''

  constructor(private uploadService: FileUploadService, private store:  Store<{app: AppState}>, private interactHandler: InteractHandlerService, private afAuth: AngularFireAuth, private renderer: Renderer2, private router: Router) {
  }

  public ngAfterViewInit() {

    this.interactHandler.setupResizableAndDraggable('.draggable', '.dropzone');
  }
  public createButton() {
    this.store.dispatch(new CreateButton());
  }
  elements$ = this.store.select(state => state.app.elements);

  selectButton(id: number) {
    this.store.dispatch(new SelectElement({ id }));
  }
  public getStyles(element: any): {[key: string]: string} {
    return {
      'transform': `translate(${element.x}px, ${element.y}px)`,
      'fontSize': `${element.fontSize}px`,
      'color': element.color,
      'width': `${element.width}px`,
      'height': `${element.height}px`,
      'letterSpacing': `${element.letterSpacing}px`,
      'lineHeight': `${element.lineHeight}px`,
      'alignItems': element.alignItems,
      'backgroundColor': element.backgroundColor
    };
  }
  @HostListener('document:keydown', ['$event'])
  public handleDeleteKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Delete') {
      this.deleteLastEditedButton();
    }
  }
  public deleteLastEditedButton() {
    if (this.lastEditedButtonId !== null) {
      const index = this.elements.findIndex(element => element.id === this.lastEditedButtonId);
      if (index !== -1) {
        this.elements.splice(index, 1);
      }
      this.lastEditedButtonId = null;
    }
  }
}
