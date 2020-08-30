import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { UpdateCategory, UpdateCurrentCategory } from '../../store/actions/category.actions';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Category } from '../../models/category';
import { selectCategoryById } from '../../store/reducers';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  categoryId: string;
  category: Observable<Category>;
  constructor(private snackBar: MatSnackBar, private router: Router, private route: ActivatedRoute,private store$: Store<any>) { }

  ngOnInit(): void {
    this.category = this.route.params.pipe(mergeMap((params: Params) => {
      this.categoryId = params.id;
      return this.store$.pipe(
        select(selectCategoryById(this.categoryId))
        ); 
      }
     ));

  }

  editCategory(category: any) {
    this.store$.dispatch(new UpdateCategory({id: this.categoryId, newCategory: {name: category.name}}));
    this.store$.dispatch(new UpdateCurrentCategory({id: ''}));
    this.snackBar.open('Updated Category ' + category.name, '' , {
      duration: 3500
  } );
    this.router.navigate(['/category']);
  }

}
