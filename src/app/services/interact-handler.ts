import {Injectable} from '@angular/core';
import interact from 'interactjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducer';
import { CreateButton, UpdateElementPosition } from '../../store/actions';

@Injectable({
  providedIn: 'root'
})
export class InteractHandlerService {

  constructor(private store:  Store<{app: AppState}>) {
  }
  private updateElementPosition(id: number, x: number, y: number) {
    this.store.dispatch(new UpdateElementPosition({id, x, y}));
  }
  setupResizableAndDraggable(dragSelector: string, dropSelector: string) {
    interact(dragSelector)
      .resizable({
        edges: {top: true, left: true, bottom: true, right: true},
        listeners: {
          move: function (event) {
            let {x, y} = event.target.dataset;

            x = (parseFloat(x) || 0) + event.deltaRect.left;
            y = (parseFloat(y) || 0) + event.deltaRect.top;

            Object.assign(event.target.style, {
              width: `${event.rect.width}px`,
              height: `${event.rect.height}px`,
              transform: `translate(${x}px, ${y}px)`
            });

            Object.assign(event.target.dataset, {x, y});
          }
        },
        modifiers: [
          interact.modifiers.restrictSize({
            min: {width: 2, height: 50}
          })
        ],
        inertia: true
      })
      .draggable({
        listeners: {
          move: (event) => {
            let target = event.target;
            let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
            let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

            target.style.transform = `translate(${x}px, ${y}px)`;
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
          },
          end: (event) => {
            let x = parseFloat(event.target.getAttribute('data-x') || 0);
            let y = parseFloat(event.target.getAttribute('data-y') || 0);

            this.updateElementPosition(event.target.id, x, y);
          }
        }
      });

    interact(dropSelector).dropzone({
      accept: '.draggable',
      overlap: 0.75,
      ondropactivate: (event) => {
        event.relatedTarget.classList.add('dragging');
      },
      ondropdeactivate: (event) => {
        event.relatedTarget.classList.remove('dragging', 'cannot-drop');
      },
      ondragenter: (event) => {
        event.relatedTarget.classList.remove('cannot-drop');
        event.relatedTarget.classList.add('can-drop');
      },
      ondragleave: (event) => {
        event.relatedTarget.classList.remove('can-drop');
        event.relatedTarget.classList.add('cannot-drop');
      }
    });
  }
}
