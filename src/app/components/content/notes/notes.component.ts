import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Note } from 'src/app/models/note';
import { NotesService } from 'src/app/services/api/notes.service';
import { CategoriesService } from 'src/app/services/api/categories.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NoteFormComponent } from '../../modal/note-form/note-form.component';
import { needConfirmation } from 'src/app/interfaces/confirm-dialog.decorator';
import { Category } from 'src/app/models/category';
import { NoteUpdateComponent } from '../../modal/note-update/note-update.component';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes: Array<Note>;
  showedNotes: Array<Note>;
  categories: Array<Category>;
  myFilter: string = '-1';
  sidebar: boolean = false;

  constructor(private authService: AuthService,
    private noteServices: NotesService,
    private categoryServices: CategoriesService,
    public dialog: MatDialog) {
  }
  ngOnInit(): void {
    this.fetchNotes();
  }

  fetchNotes() {
    this.noteServices.getNotes().subscribe({
      next: (response) => {
        this.notes = new Array<Note>();
        Object.assign(this.notes, response.content);
        this.notes = this.notes.filter((note) => note.state == "ACTIVE");
        this.showedNotes = this.notes.filter((note) => note.state == "ACTIVE");
        this.fetchCategories();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  fetchCategories() {
    this.categoryServices.getCategories().subscribe({
      next: (response) => {
        this.categories = new Array<Category>();
        Object.assign(this.categories, response.content);
        this.categories = this.categories.filter((category) => category.notes.filter((note) => note.state == "ACTIVE"));
        this.filterNotes(false);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  filterNotes(notes: any) {
    let id = Number.parseInt(this.myFilter);
    if (id != -1) {
      this.showedNotes = this.categories[id].notes.filter((note) => note.state == "ACTIVE");
      return
    }
    this.showedNotes = this.notes;
  }

  @needConfirmation({ message: "Are you sure you want to archive this note?", title: "Archive Note" })
  archiveNote(id: number) {
    this.noteServices.archiveNote(id).subscribe({
      next: (response) => {
        this.fetchNotes();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  openNoteForm() {
    let note = new Note();
    const dialogRef = this.dialog.open(NoteFormComponent, {
      data: note,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchNotes();
        this.fetchCategories();
      }

    });
  }

  openUpdateForm(note: Note) {
    const dialogRef = this.dialog.open(NoteUpdateComponent, {
      data: note,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchNotes();
      }
    });
  }

  toogleSidebar() {
    this.sidebar = !this.sidebar;
  }
}
