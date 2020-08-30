import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from '../../models/category';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { selectCategoryById } from '../../store/reducers';
import { mergeMap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { CategoryMode } from '../../enums/category.mode';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { DeleteCategory, UpdateCurrentCategory } from '../../store/actions/category.actions';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.scss']
})
export class DeleteCategoryComponent implements OnInit, OnDestroy {
  category: Category;
  mode: CategoryMode = CategoryMode.Delete;
  subscription: Subscription;

  constructor(private router: Router, private store$: Store<any>, private route: ActivatedRoute, public dialog: MatDialog ) { }

  ngOnInit(): void {
    this.subscription = this.route.params.pipe(mergeMap((params: Params) => {
      return this.store$.pipe(
        select(selectCategoryById(params.id))
        ); 
      }
     )).subscribe((category: Category) => this.category = category);
  }

  openConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '250px',
      data: {category: this.category}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteAfterConfirm(result);
      }
    });
  }

  deleteAfterConfirm(id: string) {
    this.store$.dispatch(new DeleteCategory({id: id}));
    this.store$.dispatch(new UpdateCurrentCategory({id: ''}));
    this.router.navigate(['/category']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
