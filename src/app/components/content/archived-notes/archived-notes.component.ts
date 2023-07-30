import { Component } from '@angular/core';
import { needConfirmation } from 'src/app/interfaces/confirm-dialog.decorator';
import { Category } from 'src/app/models/category';
import { Note } from 'src/app/models/note';
import { CategoriesService } from 'src/app/services/api/categories.service';
import { NotesService } from 'src/app/services/api/notes.service';


@Component({
  selector: 'app-archived-notes',
  templateUrl: './archived-notes.component.html',
  styleUrls: ['./archived-notes.component.css']
})
export class ArchivedNotesComponent {
  notes: Array<Note>;
  categories: Array<Category>;
  sidebar: boolean = false;
  constructor(
    private noteServices: NotesService,
    private categoryServices: CategoriesService
  ) { }


  ngOnInit(): void {
    this.fetchNotes();
  }

  fetchNotes() {
    this.noteServices.getNotes().subscribe({
      next: (response) => {

        this.notes = new Array<Note>();
        Object.assign(this.notes, response.content);
        this.notes = this.notes.filter((note) => note.state == "ARCHIVED");
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
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  @needConfirmation({ message: "Are you sure you want to dearchive this note?", title: "Dearchive Note" })
  dearchiveNote(id: number) {
    this.noteServices.dearchiveNote(id).subscribe({
      next: (response) => {
        this.notes = this.notes.filter(note => note.id != id)
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  @needConfirmation({ message: "Are you sure you want to erase this note?", title: "Erase Note" })
  deleteNote(id: number) {
    this.noteServices.deleteNote(id).subscribe({
      next: (response) => {
        this.notes = this.notes.filter(note => note.id != id)
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  toogleSidebar() {
    this.sidebar = !this.sidebar;
  }
}
