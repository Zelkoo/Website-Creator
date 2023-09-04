import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class WorkspaceComponent {
  constructor() {
  }

}
