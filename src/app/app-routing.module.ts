import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticateComponent } from './components/auth/authenticate/authenticate.component';
import { NotesComponent } from './components/content/notes/notes.component';
import { authGuard } from './services/auth/auth.guard';
import { ArchivedNotesComponent } from './components/content/archived-notes/archived-notes.component';

const routes: Routes = [
  { path: 'login', component: AuthenticateComponent },
  { path: 'notes', component: NotesComponent, canActivate: [authGuard] },
  { path: 'archivednotes', component: ArchivedNotesComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/notes', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
