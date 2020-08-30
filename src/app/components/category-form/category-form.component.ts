import { Component, OnInit, Input, Output, EventEmitter, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Category } from '../../models/category';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectAllCategories } from '../../store/reducers';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input('category') category: Category;
  @Output() onSubmitCategoryForm : EventEmitter<object>  = new EventEmitter();
  categories: Array<Category>;
  categoryForm: FormGroup;
  categorySubscription: Subscription;
  
  constructor(private store$: Store<any>) {
    this.initCategoryForm();
   }

  ngOnInit(): void {
    this.categorySubscription = this.store$.select(selectAllCategories).subscribe((categories: Array<Category>) => {
      this.categories = categories;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.category.name) {
      this.categoryForm.setValue({
        name: changes.category ? changes.category.currentValue.name : '',
      });
    }
       
     
  }


  initCategoryForm(){
    this.categoryForm = new FormGroup({
      name:  new FormControl('', [Validators.required, this.checkDuplicateValidation.bind(this)])
    });

  }

  checkDuplicateValidation(control: FormControl) {
    if (this.categories && control.value && this.categories.filter((category: Category) =>  category.name.toLowerCase() === control.value.toLowerCase()).length) {
      return { invalidDuplicate: true };
    }   
  }

  onSubmit() { 
    if (this.categoryForm.valid) {
      this.onSubmitCategoryForm.emit(this.categoryForm.value);
      this.categoryForm.reset();
    }
    else {
      this.categoryForm.markAsTouched();
    }
  }

  ngOnDestroy(): void {
    this.categorySubscription.unsubscribe();
  }

}
