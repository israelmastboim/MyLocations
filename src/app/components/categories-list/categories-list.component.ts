import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectAllCategories, selectCurrentCategory } from '../../store/reducers';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../../models/category';
import { UpdateCurrentCategory } from '../../store/actions/category.actions';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit, OnDestroy {
  categories: Observable<Array<Category>>;
  selectedCategory: string;
  selectedCategorySubscription: Subscription;
  constructor(private store$: Store<any>) { }

  ngOnInit(): void {
    this.categories = this.store$.pipe(select(selectAllCategories));
    this.selectedCategorySubscription = this.store$.pipe(select(selectCurrentCategory)).subscribe((currentCategory: string) => this.selectedCategory = currentCategory);
  }

  trackByFn(index, item) {
    return index;
  }

  onSelectCategory(id: string) {
    this.store$.dispatch(new UpdateCurrentCategory({id: id}))
  }

  ngOnDestroy(): void {
    this.selectedCategorySubscription.unsubscribe();
  }

}
