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
  constructor(private uploadService: FileUploadService, private store:  Store<{app: AppState}>, private interactHandler: InteractHandlerService, private afAuth: AngularFireAuth) {
  }

  public ngAfterViewInit() {
    this.interactHandler.setupResizableAndDraggable('.draggable');
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
      'backgroundColor': element.backgroundColor,
      'borderRadius': `${element.borderRadius}px`,
      'opacity': `${element.opacity}%`
    };
  }
}
