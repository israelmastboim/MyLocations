import { Action } from "@ngrx/store";

import { Category } from "../../models/category";

export const ADD_CATEGORY = "ADD_CATEGORY";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const DELETE_CATEGORY = "DELETE_CATEGORY";
export const UPDATE_CURRENT_CATEGORY = "UPDATE_CURRENT_CATEGORY";


export class AddCategory implements Action {
  readonly type = ADD_CATEGORY;

  constructor(public payload: { category: Category }) {}
}

export class UpdateCategory implements Action {
  readonly type = UPDATE_CATEGORY;

  constructor(public payload: any) {}
}

export class DeleteCategory implements Action {
    readonly type = DELETE_CATEGORY;
  
    constructor(public payload: { id: string }) {}
  }

  export class UpdateCurrentCategory implements Action {
    readonly type = UPDATE_CURRENT_CATEGORY;
  
    constructor(public payload: { id: string }) {}
  }


export type CategoryActions = AddCategory | UpdateCategory | DeleteCategory | UpdateCurrentCategory;