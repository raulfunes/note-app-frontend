import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { CategoryRegister } from 'src/app/models/category-register';
import { CategoryUpdate } from 'src/app/models/category-update';
import { CategoriesService } from 'src/app/services/api/categories.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css']
})
export class CategoriaFormComponent implements OnInit {
  category: FormGroup;
  categoryRegister: CategoryRegister;
  makingQuery: boolean = false;
  @Input() categoryUpdate: CategoryUpdate;
  @Output() closeForm = new EventEmitter<Category>()
  badCredentials: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private categoryService: CategoriesService,
    private authService: AuthService) {
    this.category = this.formBuilder.group({
      name: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    if (this.categoryUpdate) {
      this.category.setValue({
        name: this.categoryUpdate.name
      })
    }
  }

  submit() {
    if (this.category.valid) {
      this.makingQuery = true;
      if (this.categoryUpdate) {
        this.updateCategory();
        return;
      }
      this.addCategory();
    } else {
      this.category.markAllAsTouched();
    }
  }

  addCategory() {
    this.categoryRegister = new CategoryRegister();
    this.categoryRegister.username = this.authService.getUsername;
    this.categoryRegister.name = this.category.value.name;
    this.categoryService.saveCategory(this.categoryRegister).subscribe(
      {
        next: (response) => {
          let createdCategory = new Category();
          Object.assign(createdCategory, response);
          this.closeForm.emit(createdCategory);
        },
        error: (error) => {
          this.makingQuery = false;
          console.log(error);
        }
      }
    )
  }

  updateCategory() {
    this.categoryUpdate.name = this.category.value.name;
    this.categoryService.updateCategory(this.categoryUpdate).subscribe(
      {
        next: (response) => {
          let updatedCategory = new Category();
          Object.assign(updatedCategory, response);
          this.closeForm.emit(updatedCategory);
        },
        error: (error) => {
          this.makingQuery = false;
          console.log(error);
        }
      }
    )
  }

  cancel() {
    this.closeForm.emit(null);
  }
}
