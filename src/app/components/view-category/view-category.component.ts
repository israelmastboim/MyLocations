import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from '../../models/category';
import { selectCategoryById } from '../../store/reducers';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.scss']
})
export class ViewCategoryComponent implements OnInit {
  category: Observable<Category>;
  constructor(private store$: Store<any>, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.category = this.route.params.pipe(mergeMap((params: Params) => {
      return this.store$.pipe(
        select(selectCategoryById(params.id))
        ); 
      }
     ));
  }

}
