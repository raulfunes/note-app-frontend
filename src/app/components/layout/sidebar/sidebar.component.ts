import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { needConfirmation } from 'src/app/interfaces/confirm-dialog.decorator';
import { Category } from 'src/app/models/category';
import { CategoryRegister } from 'src/app/models/category-register';
import { CategoryUpdate } from 'src/app/models/category-update';
import { User } from 'src/app/models/user';
import { CategoriesService } from 'src/app/services/api/categories.service';
import { UserService } from 'src/app/services/api/user.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {
  addCategory: boolean = false;
  categoryUpdate: CategoryUpdate;

  @Input() categories: Array<Category>;
  @Output() emitCategoriesChange = new EventEmitter<boolean>()

  constructor(
    private categoryService: CategoriesService,
    private authService: AuthService,
    private router: Router) {

  }


  ngOnInit(): void {
    this.categoryUpdate = new CategoryUpdate;
    this.categoryUpdate.id = -1;
  }

  get username() {
    return this.authService.getUsername;
  }

  activateAddCategory() {
    this.addCategory = true;
  }

  activateUpdateCategory(category: Category) {
    this.categoryUpdate.id = category.id;
    this.categoryUpdate.name = category.name;
  }

  manageFormResponse(category: Category) {
    if (!category) {
      this.addCategory = false;
      this.categoryUpdate.id = -1;
      return
    }
    this.addCategory = false;
    this.categoryUpdate.id = -1;
    this.emitCategoriesChange.emit(true);
  }

  @needConfirmation({ message: "Are you sure you want to delete this category?", title: "Category Delete" })
  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe({
      next: (response) => {
        this.emitCategoriesChange.emit(true);
      },
      error: (error) => { console.log(error) }
    })
  }

  @needConfirmation({ message: "Are you sure you want to logout?", title: "Confirm Logout" })
  logout() {
    this.authService.logout();
    this.router.navigateByUrl('login')
  }

}
