import { ENVIRONMENT_INITIALIZER, NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { NotesComponent } from './components/content/notes/notes.component';
import { TokenInterceptorService } from './services/auth/token-interceptor.service';
import { AuthenticateComponent } from './components/auth/authenticate/authenticate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { CategoriaFormComponent } from './components/form/categoria-form/categoria-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { initializeDialogService } from 'src/main';
import { NoteFormComponent } from './components/modal/note-form/note-form.component';
import { NoteUpdateComponent } from './components/modal/note-update/note-update.component';
import { ArchivedNotesComponent } from './components/content/archived-notes/archived-notes.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NotesComponent,
    AuthenticateComponent,
    LoginComponent,
    RegisterComponent,
    CategoriaFormComponent,
    NoteFormComponent,
    NoteUpdateComponent,
    ArchivedNotesComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }, importProvidersFrom(MatDialogModule),
  {
    provide: ENVIRONMENT_INITIALIZER,
    useFactory: initializeDialogService,
    deps: [MatDialog],
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
