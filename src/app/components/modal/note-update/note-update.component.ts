import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/models/category';
import { Note } from 'src/app/models/note';
import { NoteRegister } from 'src/app/models/note-register';
import { CategoriesService } from 'src/app/services/api/categories.service';
import { NotesService } from 'src/app/services/api/notes.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NoteFormComponent } from '../note-form/note-form.component';
import { NoteUpdate } from 'src/app/models/note-update';

@Component({
  selector: 'app-note-update',
  templateUrl: './note-update.component.html',
  styleUrls: ['./note-update.component.css']
})
export class NoteUpdateComponent implements OnInit {
  noteForm: FormGroup;
  categories: Array<Category>;
  noteUpdate: NoteUpdate;
  constructor(public dialogRef: MatDialogRef<NoteFormComponent>,
    @Inject(MAT_DIALOG_DATA) public note: Note,
    private formBuilder: FormBuilder,
    private categoryService: CategoriesService,
    private noteService: NotesService) {
    this.noteForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      category_id: ['']
    })

  }


  ngOnInit(): void {
    console.log(this.note);
    this.fetchCategories();
  }

  populateForm() {
    this.noteForm.setValue({
      title: this.note.title,
      content: this.note.content,
      category_id: this.note.category_id ? this.note.category_id.toString() : null
    })
  }

  updateNote() {
    if (this.noteForm.valid) {
      this.noteUpdate = new NoteUpdate();
      this.noteUpdate.id = this.note.id;
      Object.assign(this.noteUpdate, this.noteForm.value)

      this.noteUpdate.category_id = this.noteForm.value.category_id ? Number.parseInt(this.noteForm.value.category_id) : null;
      console.log(this.noteUpdate);
      this.noteService.updateNote(this.noteUpdate).subscribe({
        next: (response) => {
          this.close(true);
        },
        error: (error) => {
          console.log(error);
        }
      })
    } else {
      this.noteForm.markAllAsTouched();
    }
  }

  fetchCategories() {
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        this.categories = new Array<Category>();
        Object.assign(this.categories, response.content);
        this.populateForm();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  close(ret: any): void {
    this.dialogRef.close(ret);
  }
}
