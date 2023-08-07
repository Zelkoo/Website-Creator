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
import {MatCheckboxModule} from "@angular/material/checkbox";
import {StoreModule} from "@ngrx/store";
import {buttonEditorReducer} from "../store/button-editor.reducer";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {ButtonEditorEffects} from "../store/button-editor.effects";
import {EffectsModule} from "@ngrx/effects";
import {MatInputModule} from "@angular/material/input";
import {ColorPickerModule} from "ngx-color-picker";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {CreatorComponent} from "./creator/creator.component";
import { PropertyPanelComponent } from './creator/property-panel/property-panel.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ChangeBackgroundDirective} from './app-change-background.directive';
import { WorkspaceComponent } from './creator/workspace/workspace.component';
const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'edit', component: CreatorComponent },
  { path: 'login', component: LoginComponent},
  { path: 'registration', component: RegistrationComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    ResizeManipulatorDirective,
    MoveManipulatorDirective,
    LoginComponent,
    CreatorComponent,
    RegistrationComponent,
    PropertyPanelComponent,
    ChangeBackgroundDirective,
    WorkspaceComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    DragDropModule,
    ResizableModule,
    MatSliderModule,
    MatCheckboxModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    StoreModule.forRoot({buttonEditor: buttonEditorReducer}),
    EffectsModule.forRoot([ButtonEditorEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    MatInputModule,
    ColorPickerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
