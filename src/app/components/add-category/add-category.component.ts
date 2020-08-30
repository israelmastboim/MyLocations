import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Category } from '../../models/category';
import { AddCategory } from '../../store/actions/category.actions';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  constructor(private snackBar: MatSnackBar, private router: Router, private store$: Store<any>) { }

  ngOnInit(): void {
    
  }

  addCategory(category: any) {
    this.store$.dispatch(new AddCategory({ category: new Category({name: category.name})}));
    this.snackBar.open('Added Category ' + category.name, '' , {
      duration: 3500
    } );
    this.router.navigate(['/category']);

  }

}
