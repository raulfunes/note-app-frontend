import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/models/category';
import { Note } from 'src/app/models/note';
import { NoteRegister } from 'src/app/models/note-register';
import { CategoriesService } from 'src/app/services/api/categories.service';
import { NotesService } from 'src/app/services/api/notes.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.css']
})
export class NoteFormComponent implements OnInit {
  noteForm: FormGroup;
  categories: Array<Category>;
  noteRegister: NoteRegister;
  constructor(public dialogRef: MatDialogRef<NoteFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Note,
    private formBuilder: FormBuilder,
    private categoryService: CategoriesService,
    private authService: AuthService,
    private noteService: NotesService) {
    this.noteForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      category: ['']
    })

  }


  ngOnInit(): void {
    this.fetchCategories();
  }

  addNote() {
    if (this.noteForm.valid) {
      this.noteRegister = new NoteRegister();
      Object.assign(this.noteRegister, this.noteForm.value)
      this.noteRegister.category_id = Number.parseInt(this.noteForm.value.category);
      this.noteRegister.username = this.authService.getUsername;
      console.log(this.noteRegister);
      this.noteService.saveNote(this.noteRegister).subscribe({
        next: (response) => {
          Object.assign(this.data, response);
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
