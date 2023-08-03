import {isDevMode, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {ResizeManipulatorDirective} from "./resize-manipulator.directive";
import {MoveManipulatorDirective} from "./move-manipulator.directive";
import {MatSliderModule} from "@angular/material/slider";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {ResizableModule} from "angular-resizable-element";
import {ResizeComponent} from "./resize-selector/resize.component";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {StoreModule} from "@ngrx/store";
import {buttonEditorReducer} from "../store/button-editor.reducer";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {ButtonEditorEffects} from "../store/button-editor.effects";
import {EffectsModule} from "@ngrx/effects";
import {MatInputModule} from "@angular/material/input";
import {ColorPickerModule} from "ngx-color-picker";

@NgModule({
  declarations: [
    AppComponent,
    ResizeManipulatorDirective,
    MoveManipulatorDirective,
    ResizeComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatButtonModule,
    DragDropModule,
    ResizableModule,
    MatSliderModule,
    MatCheckboxModule,
    StoreModule.forRoot({buttonEditor: buttonEditorReducer}),
    EffectsModule.forRoot([ButtonEditorEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
    MatInputModule,
    ColorPickerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
