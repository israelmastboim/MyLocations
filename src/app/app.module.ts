import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { ToolBarComponent } from './components/tool-bar/tool-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { DeleteCategoryComponent } from './components/delete-category/delete-category.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { reducers } from './store/reducers';
import { persistentStorageMetaReducer } from './store/reducers/category.reducer';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';
import { ViewCategoryComponent } from './components/view-category/view-category.component';
import { ConfirmDeleteDialogComponent } from './components/confirm-delete-dialog/confirm-delete-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    ToolBarComponent,
    EditCategoryComponent,
    AddCategoryComponent,
    CategoriesListComponent,
    DeleteCategoryComponent,
    CategoryFormComponent,
    CategoryDetailsComponent,
    ViewCategoryComponent,
    ConfirmDeleteDialogComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatRippleModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    StoreModule.forRoot(reducers, { 
      metaReducers: [persistentStorageMetaReducer] 
    })
  ],
  providers: [],
  entryComponents: [ConfirmDeleteDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
