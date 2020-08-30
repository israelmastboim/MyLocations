import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryMode } from '../../enums/category.mode';


@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent implements OnInit {
  @Input() category: Category;
  @Input() mode: CategoryMode;
  @Output() onDelete = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

  onclickDelete() {
    this.onDelete.emit();
  }

}
