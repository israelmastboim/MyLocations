import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryMode } from './enums/category.mode';

import { ToolBarComponent } from './components/tool-bar/tool-bar.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { DeleteCategoryComponent } from './components/delete-category/delete-category.component';
import { ViewCategoryComponent } from './components/view-category/view-category.component';

const routes: Routes = [
  { path: 'category', component: ToolBarComponent, children: [
    { path: 'add', component: AddCategoryComponent, data: {mode : CategoryMode.Add} },
    { path: 'view/:id', component: ViewCategoryComponent, data: {mode : CategoryMode.View}},
    { path: 'edit/:id', component: EditCategoryComponent , data: {mode : CategoryMode.Edit}},
    { path: 'delete/:id', component: DeleteCategoryComponent, data: {mode : CategoryMode.Delete}},
    { path: '', component: CategoriesListComponent, pathMatch: 'full', data: {mode : CategoryMode.ViewList}}
    ]
  },
  {path: '', redirectTo: 'category', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
