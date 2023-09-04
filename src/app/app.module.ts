import {isDevMode, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {MatSliderModule} from "@angular/material/slider";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {ResizableModule} from "angular-resizable-element";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {StoreModule} from "@ngrx/store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {MatInputModule} from "@angular/material/input";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {CreatorComponent} from "./creator/creator.component";
import {PropertyPanelComponent} from './creator/property-panel/property-panel.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {WorkspaceComponent} from './creator/workspace/workspace.component';
import {UploadComponent} from './creator/file-upload/upload.component';
import {UploadDetailsComponent} from './creator/upload-details/upload-details.component';
import {UploadListComponent} from './creator/upload-list/upload-list.component';
import {UploadFormComponent} from './creator/upload-form/upload-form.component';
import {ColorPickerModule} from "ngx-color-picker";
import {NgxColorsModule} from "ngx-colors";
import { TypographyPanelComponent } from './creator/property-panel/panels/typography-panel/typography-panel.component';
import { BorderPanelComponent } from './creator/property-panel/panels/border-panel/border-panel.component';
import { EffectPanelComponent } from './creator/property-panel/panels/effect-panel/effect-panel.component';
import { SizePanelComponent } from './creator/property-panel/panels/size-panel/size-panel.component';
import { BackgroundPanelComponent } from './creator/property-panel/panels/background-panel/background-panel.component';
import { appReducer } from '../store/reducer';
import { MyEffects } from '../store/effects';
import { EffectsModule } from '@ngrx/effects';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'edit', component: CreatorComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreatorComponent,
    RegistrationComponent,
    PropertyPanelComponent,
    WorkspaceComponent,
    UploadComponent,
    UploadDetailsComponent,
    UploadListComponent,
    UploadFormComponent,
    TypographyPanelComponent,
    BorderPanelComponent,
    EffectPanelComponent,
    SizePanelComponent,
    BackgroundPanelComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxColorsModule,
    MatButtonModule,
    DragDropModule,
    ColorPickerModule,
    ResizableModule,
    MatSliderModule,
    MatCheckboxModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    StoreModule.forRoot({ app: appReducer }),
    EffectsModule.forRoot([MyEffects]),
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
export class AppModule {
}
