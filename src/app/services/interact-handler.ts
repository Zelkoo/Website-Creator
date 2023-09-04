import {Injectable} from '@angular/core';
import interact from 'interactjs';
import { Store } from '@ngrx/store';
import { UpdateElementPosition, UpdateElementSize } from '../../store/actions';
import { AppState } from '../../store/reducer';

@Injectable({
  providedIn: 'root'
})
export class InteractHandlerService {

  constructor(private store:  Store<{app: AppState}>) {
  }
  private updateElementPosition(id: number, x: number, y: number) {
    this.store.dispatch(new UpdateElementPosition({id, x, y}));
  }
  private updateElementSize(id: number, width: number, height: number) {
    this.store.dispatch(new UpdateElementSize({id, width, height}));
  }
  setupResizableAndDraggable(dragSelector: string) {
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
          },
          end: (event) => {
            let width = parseFloat(event.rect.width || 0);
            let height = parseFloat(event.rect.height || 0);

            this.updateElementSize(event.target.id, width, height);

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

            this.updateElementPosition(Number(event.target.id), x, y);
          }
        }
      });
  }
}
